import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChatStore } from '~/stores/chatStore'
import type { Message } from '~/types/models'

describe('ChatStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have empty messages array', () => {
      const store = useChatStore()
      expect(store.messages).toEqual([])
    })

    it('should have empty input message', () => {
      const store = useChatStore()
      expect(store.inputMessage).toBe('')
    })

    it('should have loading states set to false', () => {
      const store = useChatStore()
      expect(store.isLoading).toBe(false)
      expect(store.isThinking).toBe(false)
      expect(store.isWidgetLoading).toBe(false)
    })

    it('should have null messages container', () => {
      const store = useChatStore()
      expect(store.messagesContainer).toBeNull()
    })
  })

  describe('addMessage', () => {
    it('should add a message to the messages array', () => {
      const store = useChatStore()
      const message: Message = {
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }

      store.addMessage(message)

      expect(store.messages).toHaveLength(1)
      expect(store.messages[0]).toEqual(message)
    })

    it('should add multiple messages', () => {
      const store = useChatStore()
      const message1: Message = {
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }
      const message2: Message = {
        text: 'Hi',
        sender: 'assistant',
        timestamp: new Date(),
      }

      store.addMessage(message1)
      store.addMessage(message2)

      expect(store.messages).toHaveLength(2)
    })
  })

  describe('updateMessage', () => {
    it('should update an existing message', () => {
      const store = useChatStore()
      const message: Message = {
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }

      store.addMessage(message)
      store.updateMessage(0, { text: 'Updated' })

      expect(store.messages[0].text).toBe('Updated')
      expect(store.messages[0].sender).toBe('user')
    })

    it('should update partial message properties', () => {
      const store = useChatStore()
      const message: Message = {
        text: 'Hello',
        sender: 'assistant',
        timestamp: new Date(),
        isStreaming: false,
      }

      store.addMessage(message)
      store.updateMessage(0, { isStreaming: true, displayedText: 'H' })

      expect(store.messages[0].isStreaming).toBe(true)
      expect(store.messages[0].displayedText).toBe('H')
      expect(store.messages[0].text).toBe('Hello')
    })

    it('should not update if index is out of bounds (negative)', () => {
      const store = useChatStore()
      const message: Message = {
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }

      store.addMessage(message)
      store.updateMessage(-1, { text: 'Updated' })

      expect(store.messages[0].text).toBe('Hello')
    })

    it('should not update if index is out of bounds (too large)', () => {
      const store = useChatStore()
      const message: Message = {
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }

      store.addMessage(message)
      store.updateMessage(10, { text: 'Updated' })

      expect(store.messages[0].text).toBe('Hello')
    })
  })

  describe('clearMessages', () => {
    it('should clear all messages and reset state', () => {
      const store = useChatStore()
      store.addMessage({
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      })
      store.inputMessage = 'test'
      store.isLoading = true
      store.isThinking = true
      store.isWidgetLoading = true

      store.clearMessages()

      expect(store.messages).toEqual([])
      expect(store.inputMessage).toBe('')
      expect(store.isLoading).toBe(false)
      expect(store.isThinking).toBe(false)
      expect(store.isWidgetLoading).toBe(false)
    })
  })

  describe('setMessagesContainer', () => {
    it('should set the messages container', () => {
      const store = useChatStore()
      const container = document.createElement('div')

      store.setMessagesContainer(container)

      expect(store.messagesContainer).toBe(container)
    })

    it('should allow setting container to null', () => {
      const store = useChatStore()
      const container = document.createElement('div')
      store.setMessagesContainer(container)

      store.setMessagesContainer(null)

      expect(store.messagesContainer).toBeNull()
    })
  })
})
