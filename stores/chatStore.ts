import { defineStore } from "pinia";
import { ref } from "vue";
import type { Message } from "~/types/models";

export const useChatStore = defineStore("chat", () => {
  const messages = ref<Message[]>([]);
  const inputMessage = ref("");
  const isLoading = ref(false);
  const isThinking = ref(false);
  const isWidgetLoading = ref(false);
  const messagesContainer = ref<HTMLElement | null>(null);

  const addMessage = (message: Message) => {
    messages.value.push(message);
  };

  /**
   *  Updates a message at the specified index
   * @param index
   * @param message
   */
  const updateMessage = (index: number, message: Partial<Message>) => {
    if (index >= 0 && index < messages.value.length) {
      messages.value[index] = { ...messages.value[index], ...message };
    }
  };

  /**   * Clears all messages and resets state
   */
  const clearMessages = () => {
    messages.value = [];
    inputMessage.value = "";
    isLoading.value = false;
    isThinking.value = false;
    isWidgetLoading.value = false;
  };

  const setMessagesContainer = (container: HTMLElement | null) => {
    messagesContainer.value = container;
  };

  return {
    // state
    messages,
    inputMessage,
    isLoading,
    isThinking,
    isWidgetLoading,
    messagesContainer,

    // actions
    addMessage,
    updateMessage,
    clearMessages,
    setMessagesContainer,
  };
});
