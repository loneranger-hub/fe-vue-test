import { describe, it, expect, beforeEach } from 'vitest'
import { WidgetService } from '~/services/widgetService'
import { ActionType, WidgetComponent } from '~/constants/actionTypes'
import type { ChartAction, TableAction } from '~/types/actions'

describe('WidgetService', () => {
  let service: WidgetService

  beforeEach(() => {
    service = new WidgetService()
  })

  describe('generateChartWidget', () => {
    it('should generate chart widget with all properties', () => {
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20, 30],
        labels: ['A', 'B', 'C'],
        title: 'Test Chart',
      }

      const result = service.generateChartWidget(action)

      expect(result.component).toBe(WidgetComponent.CHART)
      expect(result.props.title).toBe('Test Chart')
      expect(result.props.data).toEqual([10, 20, 30])
      expect(result.props.labels).toEqual(['A', 'B', 'C'])
    })

    it('should use default values for missing properties', () => {
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [],
        labels: [],
        title: '',
      }

      const result = service.generateChartWidget(action)

      expect(result.props.title).toBe('Chart Data')
      expect(result.props.data).toEqual([])
      expect(result.props.labels).toEqual([])
    })
  })

  describe('generateTableWidget', () => {
    it('should generate table widget with auto-generated columns', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [
          { label: 'A', value: 10 },
          { label: 'B', value: 20 },
        ],
        title: 'Test Table',
      }

      const result = service.generateTableWidget(action)

      expect(result.component).toBe(WidgetComponent.TABLE)
      expect(result.props.title).toBe('Test Table')
      expect(result.props.columns).toEqual(['Label', 'Value'])
      expect(result.props.rows).toEqual([
        { label: 'A', value: 10 },
        { label: 'B', value: 20 },
      ])
    })

    it('should use provided columns if available', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: 'A', value: 10 }],
        columns: ['Custom', 'Columns'],
        title: 'Test Table',
      }

      const result = service.generateTableWidget(action)

      expect(result.props.columns).toEqual(['Custom', 'Columns'])
    })

    it('should handle empty data array', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [],
        title: 'Empty Table',
      }

      const result = service.generateTableWidget(action)

      expect(result.props.columns).toEqual([])
      expect(result.props.rows).toEqual([])
    })

    it('should use default title when missing', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [],
        title: '',
      }

      const result = service.generateTableWidget(action)

      expect(result.props.title).toBe('Data Table')
    })

    it('should capitalize column names correctly', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [
          { name: 'John', age: 30 },
          { name: 'Jane', age: 25 },
        ],
        title: 'Users',
      }

      const result = service.generateTableWidget(action)

      expect(result.props.columns).toEqual(['Name', 'Age'])
    })
  })

  describe('processAction', () => {
    it('should process chart action', () => {
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: ['A', 'B'],
        title: 'Test',
      }

      const result = service.processAction(action)

      expect(result).not.toBeNull()
      expect(result?.component).toBe(WidgetComponent.CHART)
    })

    it('should process table action', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: 'A', value: 10 }],
        title: 'Test',
      }

      const result = service.processAction(action)

      expect(result).not.toBeNull()
      expect(result?.component).toBe(WidgetComponent.TABLE)
    })

    it('should return null for null input', () => {
      expect(service.processAction(null)).toBeNull()
    })

    it('should return null for undefined input', () => {
      expect(service.processAction(undefined)).toBeNull()
    })

    it('should return null for unknown action type', () => {
      const unknownAction = {
        type: 'unknown_type',
      } as any

      expect(service.processAction(unknownAction)).toBeNull()
    })
  })

  describe('validateAction', () => {
    it('should validate valid chart action', () => {
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: ['A', 'B'],
        title: 'Test',
      }

      expect(service.validateAction(action)).toBe(true)
    })

    it('should reject chart action with mismatched data/labels length', () => {
      const action: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: ['A'],
        title: 'Test',
      }

      expect(service.validateAction(action)).toBe(false)
    })

    it('should reject chart action with non-array data', () => {
      const action = {
        type: ActionType.SHOW_CHART,
        data: 'not an array',
        labels: ['A'],
        title: 'Test',
      } as any

      expect(service.validateAction(action)).toBe(false)
    })

    it('should reject chart action with non-array labels', () => {
      const action = {
        type: ActionType.SHOW_CHART,
        data: [10],
        labels: 'not an array',
        title: 'Test',
      } as any

      expect(service.validateAction(action)).toBe(false)
    })

    it('should validate valid table action', () => {
      const action: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: 'A', value: 10 }],
        title: 'Test',
      }

      expect(service.validateAction(action)).toBe(true)
    })

    it('should reject table action with non-array data', () => {
      const action = {
        type: ActionType.SHOW_TABLE,
        data: 'not an array',
        title: 'Test',
      } as any

      expect(service.validateAction(action)).toBe(false)
    })

    it('should return false for unknown action type', () => {
      const unknownAction = {
        type: 'unknown_type',
      } as any

      expect(service.validateAction(unknownAction)).toBe(false)
    })
  })
})
