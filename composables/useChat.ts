import { useChatStore } from "~/stores/chatStore";
import { useChartStore } from "~/stores/chartStore";
import { CONFIG } from "~/constants/actionTypes";

/**
 * Composable for chat UI-related functionality
 * Handles UI concerns like scrolling, formatting, and typewriter effects
 */
export const useChat = () => {
  const chatStore = useChatStore();
  const chartStore = useChartStore();

  /**
   * Scrolls messages container to bottom
   */
  const scrollToBottom = () => {
    if (chatStore.messagesContainer) {
      chatStore.messagesContainer.scrollTop =
        chatStore.messagesContainer.scrollHeight;
    }
  };

  /**
   * Formats timestamp to readable time string
   */
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  /**
   * Creates typewriter effect for message display
   */
  const typewriterEffect = async (text: string, messageIndex: number) => {
    const message = chatStore.messages[messageIndex];
    if (!message) return;

    chatStore.updateMessage(messageIndex, {
      isStreaming: true,
      displayedText: "",
    });

    for (let i = 0; i < text.length; i++) {
      const currentMessage = chatStore.messages[messageIndex];
      if (currentMessage) {
        const newDisplayedText = (currentMessage.displayedText || "") + text[i];
        chatStore.updateMessage(messageIndex, {
          displayedText: newDisplayedText,
        });
      }
      await new Promise((resolve) =>
        setTimeout(resolve, CONFIG.TYPEWRITER_DELAY),
      );
      scrollToBottom();
    }

    chatStore.updateMessage(messageIndex, { isStreaming: false, text });
  };

  /**
   * Clears chat and chart data
   */
  const clearChat = () => {
    chatStore.clearMessages();
    chartStore.clearChart();
  };

  return {
    chatStore,
    chartStore,
    scrollToBottom,
    formatTime,
    typewriterEffect,
    clearChat,
  };
};
