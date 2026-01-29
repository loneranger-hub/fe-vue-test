<template>
  <ClientOnly>
    <div class="flex gap-4 p-4 h-screen">
      <div class="flex-none w-1/4 min-w-[300px]">
        <ChatSection @action="handleActionEvent" @widget-loading="handleWidgetLoading" />
      </div>
      <div class="flex-1 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
        <div
          v-if="!chartStore.currentComponent && !chartStore.isProcessing"
          class="flex items-center justify-center h-full"
        >
          <div class="text-center text-gray-500">
            <p class="m-0 text-sm">Make a move, don't be shy</p>
          </div>
        </div>
        <div v-if="chartStore.isProcessing" class="flex items-center justify-center h-full min-h-[400px]">
          <div class="flex flex-col items-center gap-5">
            <div class="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            <p class="m-0 text-sm text-gray-600 font-medium">Processing ...</p>
          </div>
        </div>
        <component
          v-if="chartStore.currentComponent && !chartStore.isProcessing"
          :is="chartStore.currentComponent.component"
          v-bind="chartStore.currentComponent.props"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useChartStore } from "@/stores/chartStore";
import { useWidget } from "@/composables/useWidget";
import type { Action } from "@/types/actions";

useHead({
  title: "Chats",
});

const chartStore = useChartStore();
const { handleAction } = useWidget();

/**
 *  Handles action events emitted from the ChatSection component.
 * @param action 
 */
const handleActionEvent = (action: Action) => {
  handleAction(action);
};

/**
 * Handles the loading state of the widget.
 * @param isLoading - A boolean indicating whether the widget is loading.
 */
const handleWidgetLoading = (isLoading: boolean) => {
  chartStore.setProcessing(isLoading);
};
</script>
