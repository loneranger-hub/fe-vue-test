<template>
  <ClientOnly>
    <div class="flex flex-col h-full w-full border border-gray-300 rounded-lg bg-white shadow-md font-sans">
      <div class="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
        <h2 class="m-0 text-lg text-gray-800">Chat Section</h2>
        <button 
          class="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded cursor-pointer text-xs transition-all duration-200 hover:bg-gray-200" 
          @click="clearChat"
        >
          Clear chat
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin" ref="messagesContainerRef">
        <div
          v-for="(message, index) in chatStore.messages"
          :key="index"
          :class="[
            'flex flex-col gap-1 animate-slide-in',
            message.sender === 'user' ? 'items-end' : 'items-start'
          ]"
        >
          <div 
            :class="[
              'px-3.5 py-2.5 rounded-xl break-words max-w-[70%] leading-snug text-sm',
              message.sender === 'user' 
                ? 'bg-primary text-white rounded-br' 
                : 'bg-gray-100 text-gray-800 rounded-bl'
            ]"
          >
            <span
              v-if="
                message.sender === 'assistant' &&
                index === chatStore.messages.length - 1 &&
                message.isStreaming
              "
            >
              {{ message.displayedText }}<span class="inline-block w-0.5 h-4 bg-gray-800 ml-0.5 animate-blink"></span>
            </span>
            <span v-else>
              {{ message.text }}
            </span>
          </div>
          <div class="text-xs text-gray-500 px-1">{{ formatTime(message.timestamp) }}</div>
        </div>
        <div v-if="chatStore.isThinking" class="flex flex-col gap-1 items-start animate-slide-in">
          <div class="flex items-center gap-1 px-3.5 py-2.5">
            <span class="inline-block w-2 h-2 rounded-full bg-gray-600 animate-bounce-dot"></span>
            <span class="inline-block w-2 h-2 rounded-full bg-gray-600 animate-bounce-dot" style="animation-delay: 0.2s"></span>
            <span class="inline-block w-2 h-2 rounded-full bg-gray-600 animate-bounce-dot" style="animation-delay: 0.4s"></span>
          </div>
        </div>
        <div
          v-if="chatStore.messages.length === 0 && !chatStore.isThinking"
          class="flex items-center justify-center h-full text-gray-500 text-sm"
        >
          <p>No messages yet</p>
        </div>
      </div>

      <div class="flex gap-2 p-3 border-t border-gray-300 bg-gray-50">
        <input
          v-model="chatStore.inputMessage"
          type="text"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
          :disabled="chatStore.isLoading"
          class="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl text-sm transition-colors duration-200 focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:text-gray-400"
        />
        <button
          @click="sendMessage"
          :disabled="!chatStore.inputMessage.trim() || chatStore.isLoading"
          class="px-5 py-2.5 bg-primary text-white border-none rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 whitespace-nowrap hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useChat } from "../composables/useChat";
import { useAgent } from "../composables/useAgent";
import type { Action } from "~/types/actions";

const emit = defineEmits<{
  action: [action: Action];
  "widget-loading": [isLoading: boolean];
}>();

const messagesContainerRef = ref<HTMLElement | null>(null);

const { chatStore, scrollToBottom, formatTime, typewriterEffect, clearChat } =
  useChat();

const { processMessage } = useAgent();

watch(
  () => chatStore.messages,
  () => {
    nextTick(() => {
      scrollToBottom();
    });
  },
  { deep: true },
);

/**
 * Sends the user's message and processes the assistant's response.
 */
const sendMessage = async () => {
  if (!chatStore.inputMessage.trim() || chatStore.isLoading) return;
  chatStore.setMessagesContainer(messagesContainerRef.value);

  const userInput = chatStore.inputMessage;
  chatStore.inputMessage = "";

  await processMessage(
    userInput,
    typewriterEffect,
    scrollToBottom,
    (action) => emit("action", action),
    (loading) => emit("widget-loading", loading),
  );

  await nextTick();
  scrollToBottom();
};
</script>
