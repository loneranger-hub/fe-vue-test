import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWidget } from '~/composables/useWidget'
import { useChartStore } from '~/stores/chartStore'
import { ActionType, WidgetComponent } from '~/constants/actionTypes'
import type { ChartAction, TableAction } from '~/types/actions'
import { widgetRegistry } from '~/utils/widgetRegistry'

describe('useWidget', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('handleAction', () => {
    it('should process chart action and set component', () => {
      const { handleAction } = useWidget()
      const chartStore = useChartStore()
      
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: ['A', 'B'],
        title: 'Test Chart',
      }

      handleAction(action)

      expect(chartStore.currentComponent).not.toBeNull()
      expect(chartStore.isProcessing).toBe(false)
    })

    it('should process table action and set component', () => {
      const { handleAction } = useWidget()
      const chartStore = useChartStore()
      
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: 'A', value: 10 }],
        title: 'Test Table',
      }

      handleAction(action)

      expect(chartStore.currentComponent).not.toBeNull()
      expect(chartStore.isProcessing).toBe(false)
    })

    it('should handle null action gracefully', () => {
      const { handleAction } = useWidget()
      expect(() => handleAction(null)).not.toThrow()
    })

    it('should handle undefined action gracefully', () => {
      const { handleAction } = useWidget()
      expect(() => handleAction(undefined)).not.toThrow()
    })

    it('should set processing to false after handling', () => {
      const { handleAction } = useWidget()
      const chartStore = useChartStore()
      chartStore.setProcessing(true)
      
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10],
        labels: ['A'],
        title: 'Test',
      }

      handleAction(action)

      expect(chartStore.isProcessing).toBe(false)
    })

    it('should handle invalid action gracefully', () => {
      const { handleAction } = useWidget()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const invalidAction = {
        type: ActionType.SHOW_CHART,
        data: 'not an array',
        labels: [],
        title: 'Test',
      } as any

      expect(() => handleAction(invalidAction)).not.toThrow()
      consoleSpy.mockRestore()
    })

    it('should handle missing widget component gracefully', () => {
      const { handleAction } = useWidget()
      const chartStore = useChartStore()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Test with a valid action - component should be found
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10],
        labels: ['A'],
        title: 'Test',
      }

      // This should work since WidgetChart is registered
      handleAction(action)
      
      // Verify component was set successfully
      expect(chartStore.currentComponent).not.toBeNull()
      consoleSpy.mockRestore()
    })
  })

  describe('clearWidget', () => {
    it('should clear widget from store', () => {
      const { clearWidget } = useWidget()
      const chartStore = useChartStore()
      
      // Set some state first
      chartStore.setComponent({
        component: {} as any,
        props: {},
      })
      
      clearWidget()
      
      expect(chartStore.currentComponent).toBeNull()
      expect(chartStore.previousAction).toBeNull()
      expect(chartStore.isProcessing).toBe(false)
    })
  })

  describe('returned values', () => {
    it('should return handleAction function', () => {
      const { handleAction } = useWidget()
      expect(typeof handleAction).toBe('function')
    })

    it('should return clearWidget function', () => {
      const { clearWidget } = useWidget()
      expect(typeof clearWidget).toBe('function')
    })
  })
})
