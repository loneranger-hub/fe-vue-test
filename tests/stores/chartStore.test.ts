import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChartStore } from '~/stores/chartStore'
import { ActionType } from '~/constants/actionTypes'
import type { ChartAction, TableAction } from '~/types/actions'
import type { WidgetComponent } from '~/types/models'

describe('ChartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have null current component', () => {
      const store = useChartStore()
      expect(store.currentComponent).toBeNull()
    })

    it('should have isProcessing set to false', () => {
      const store = useChartStore()
      expect(store.isProcessing).toBe(false)
    })

    it('should have null previous action', () => {
      const store = useChartStore()
      expect(store.previousAction).toBeNull()
    })
  })

  describe('setComponent', () => {
    it('should set the current component', () => {
      const store = useChartStore()
      const component: WidgetComponent = {
        component: {} as any,
        props: { title: 'Test' },
      }

      store.setComponent(component)

      expect(store.currentComponent).toEqual(component)
    })

    it('should allow setting component to null', () => {
      const store = useChartStore()
      const component: WidgetComponent = {
        component: {} as any,
        props: {},
      }
      store.setComponent(component)

      store.setComponent(null)

      expect(store.currentComponent).toBeNull()
    })
  })

  describe('setProcessing', () => {
    it('should set isProcessing to true', () => {
      const store = useChartStore()
      store.setProcessing(true)
      expect(store.isProcessing).toBe(true)
    })

    it('should set isProcessing to false', () => {
      const store = useChartStore()
      store.setProcessing(true)
      store.setProcessing(false)
      expect(store.isProcessing).toBe(false)
    })
  })

  describe('setPreviousAction', () => {
    it('should set chart action as previous action', () => {
      const store = useChartStore()
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: ['A', 'B'],
        title: 'Test',
      }

      store.setPreviousAction(action)

      expect(store.previousAction).toEqual(action)
    })

    it('should set table action as previous action', () => {
      const store = useChartStore()
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: 'A', value: 10 }],
        title: 'Test',
      }

      store.setPreviousAction(action)

      expect(store.previousAction).toEqual(action)
    })

    it('should allow setting action to null', () => {
      const store = useChartStore()
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [],
        labels: [],
        title: 'Test',
      }
      store.setPreviousAction(action)

      store.setPreviousAction(null)

      expect(store.previousAction).toBeNull()
    })
  })

  describe('clearChart', () => {
    it('should clear all chart state', () => {
      const store = useChartStore()
      const component: WidgetComponent = {
        component: {} as any,
        props: {},
      }
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [],
        labels: [],
        title: 'Test',
      }

      store.setComponent(component)
      store.setProcessing(true)
      store.setPreviousAction(action)

      store.clearChart()

      expect(store.currentComponent).toBeNull()
      expect(store.isProcessing).toBe(false)
      expect(store.previousAction).toBeNull()
    })
  })
})
