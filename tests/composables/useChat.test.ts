import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useChat } from "~/composables/useChat";
import { CONFIG } from "~/constants/actionTypes";

describe("useChat", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("scrollToBottom", () => {
    it("should scroll container to bottom when container exists", () => {
      const { chatStore, scrollToBottom } = useChat();
      const container = document.createElement("div");
      // Mock scrollHeight as it's a read-only property
      Object.defineProperty(container, "scrollHeight", {
        value: 1000,
        configurable: true,
      });
      container.scrollTop = 0;
      chatStore.setMessagesContainer(container);

      scrollToBottom();

      expect(container.scrollTop).toBe(1000);
    });

    it("should not throw when container is null", () => {
      const { scrollToBottom } = useChat();
      expect(() => scrollToBottom()).not.toThrow();
    });
  });

  describe("formatTime", () => {
    it("should format date to time string", () => {
      const { formatTime } = useChat();
      const date = new Date("2024-01-01T14:30:00");
      const result = formatTime(date);
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    it("should format different times correctly", () => {
      const { formatTime } = useChat();
      const date1 = new Date("2024-01-01T09:05:00");
      const date2 = new Date("2024-01-01T23:59:00");

      const result1 = formatTime(date1);
      const result2 = formatTime(date2);

      expect(result1).toBeTruthy();
      expect(result2).toBeTruthy();
      expect(result1).not.toBe(result2);
    });
  });

  describe("typewriterEffect", () => {
   
    it("should return early if message does not exist", async () => {
      const { typewriterEffect } = useChat();
      await expect(typewriterEffect("Hello", 999)).resolves.toBeUndefined();
    });

    it("should handle empty text", async () => {
      const { chatStore, typewriterEffect } = useChat();
      chatStore.addMessage({
        text: "",
        sender: "assistant",
        timestamp: new Date(),
      });

      await typewriterEffect("", 0);
      expect(chatStore.messages[0].text).toBe("");
      expect(chatStore.messages[0].isStreaming).toBe(false);
    });
  });

  describe("clearChat", () => {
    it("should clear chat and chart stores", () => {
      const { chatStore, chartStore, clearChat } = useChat();
      chatStore.addMessage({
        text: "Test",
        sender: "user",
        timestamp: new Date(),
      });
      chatStore.inputMessage = "test input";

      clearChat();

      expect(chatStore.messages).toEqual([]);
      expect(chatStore.inputMessage).toBe("");
      expect(chartStore.currentComponent).toBeNull();
    });
  });

  describe("returned values", () => {
    it("should return chatStore", () => {
      const { chatStore } = useChat();
      expect(chatStore).toBeDefined();
    });

    it("should return chartStore", () => {
      const { chartStore } = useChat();
      expect(chartStore).toBeDefined();
    });

    it("should return all required functions", () => {
      const result = useChat();
      expect(result.scrollToBottom).toBeDefined();
      expect(result.formatTime).toBeDefined();
      expect(result.typewriterEffect).toBeDefined();
      expect(result.clearChat).toBeDefined();
    });
  });
});
