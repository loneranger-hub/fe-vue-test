import { describe, it, expect } from 'vitest'
import { isChartAction, isTableAction } from '~/types/actions'
import { ActionType } from '~/constants/actionTypes'
import type { ChartAction, TableAction } from '~/types/actions'

describe('Action Type Guards', () => {
  describe('isChartAction', () => {
    it('should return true for chart action', () => {
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: ['A', 'B'],
        title: 'Test',
      }

      expect(isChartAction(action)).toBe(true)
    })

    it('should return false for table action', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [],
        title: 'Test',
      }

      expect(isChartAction(action)).toBe(false)
    })

    it('should return false for null', () => {
      expect(isChartAction(null as any)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isChartAction(undefined as any)).toBe(false)
    })
  })

  describe('isTableAction', () => {
    it('should return true for table action', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: 'A', value: 10 }],
        title: 'Test',
      }

      expect(isTableAction(action)).toBe(true)
    })

    it('should return false for chart action', () => {
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [],
        labels: [],
        title: 'Test',
      }

      expect(isTableAction(action)).toBe(false)
    })

    it('should return false for null', () => {
      expect(isTableAction(null as any)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isTableAction(undefined as any)).toBe(false)
    })
  })
})
