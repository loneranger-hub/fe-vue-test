import { useChatStore } from '~/stores/chatStore'
import { useChartStore } from '~/stores/chartStore'
import { agentService } from '~/services/agentService'
import { widgetService } from '~/services/widgetService'
import { ErrorHandler } from '~/utils/errorHandler'
import type { Action } from '~/types/actions'

/**
 * Composable for agent message processing
 * Handles the flow of processing user messages and generating responses
 */
export function useAgent() {
  const chatStore = useChatStore()
  const chartStore = useChartStore()

  /**
   * Processes a user message and generates assistant response
   */
  const processMessage = async (
    userInput: string,
    typewriterEffect: (text: string, index: number) => Promise<void>,
    scrollToBottom: () => void,
    onAction?: (action: Action) => void,
    onLoadingChange?: (loading: boolean) => void
  ): Promise<void> => {
    try {
      // Add user message
      chatStore.addMessage({
        text: userInput,
        sender: 'user',
        timestamp: new Date(),
      })

      scrollToBottom()

      // Set loading state
      chatStore.isLoading = true
      chatStore.isThinking = true
      onLoadingChange?.(true)
      scrollToBottom()

      // Simulate thinking delay
      await agentService.simulateThinkingDelay()

      chatStore.isThinking = false
      const assistantMessageIndex = chatStore.messages.length

      // Process user input and get response
      const previousAction = chartStore.previousAction
      const response = await agentService.processUserInput(
        userInput,
        previousAction,
      )

      // Add assistant message
      chatStore.addMessage({
        text: '',
        displayedText: '',
        sender: 'assistant',
        timestamp: new Date(),
        isStreaming: true,
        action: response.action,
      })

      onLoadingChange?.(true)

      // Display message with typewriter effect
      await typewriterEffect(response.message, assistantMessageIndex)

      // Process action if present
      if (response.action) {
        // Validate action
        if (!widgetService.validateAction(response.action)) {
          throw new Error('Invalid action data')
        }
        // Store previous action for context
        chartStore.setPreviousAction(response.action)
        // Trigger action callback
        onAction?.(response.action)
      }

      onLoadingChange?.(false)
      chatStore.isLoading = false
      scrollToBottom()
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.handleActionError(error, 'process_message'),
      )
      chatStore.isLoading = false
      chatStore.isThinking = false
      onLoadingChange?.(false)

      // Show error message to user
      chatStore.addMessage({
        text: 'Sorry, an error occurred while processing your message.',
        sender: 'assistant',
        timestamp: new Date(),
      })
      scrollToBottom()
    }
  }

  return {
    processMessage,
  }
}
