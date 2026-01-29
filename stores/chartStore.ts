import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import type { WidgetComponent } from '~/types/models'
import type { Action } from '~/types/actions'

export const useChartStore = defineStore('chart', () => {
  const currentComponent = shallowRef<WidgetComponent | null>(null)
  const isProcessing = ref(false)
  const previousAction = ref<Action | null>(null) // Store previous action data for transformations

  const setComponent = (component: WidgetComponent | null) => {
    currentComponent.value = component
  }

  const setProcessing = (processing: boolean) => {
    isProcessing.value = processing
  }

  const setPreviousAction = (action: Action | null) => {
    previousAction.value = action
  }

  const clearChart = () => {
    currentComponent.value = null
    isProcessing.value = false
    previousAction.value = null
  }

  return {
    // State
    currentComponent,
    isProcessing,
    previousAction,

    // Actions
    setComponent,
    setProcessing,
    setPreviousAction,
    clearChart,
  }
})
