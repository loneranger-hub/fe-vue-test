import { ActionType } from '~/constants/actionTypes'

/**
 * Base action interface
 */
export interface BaseAction {
  type: ActionType
  title?: string
}

/**
 * Chart action data
 */
export interface ChartAction extends BaseAction {
  type: ActionType.SHOW_CHART
  data: number[]
  labels: string[]
  title: string
}

/**
 * Table action data
 */
export interface TableAction extends BaseAction {
  type: ActionType.SHOW_TABLE
  data: Record<string, any>[]
  columns?: string[]
  title: string
}

/**
 * Union type for all actions
 */
export type Action = ChartAction | TableAction

/**
 * Type guard to check if action is ChartAction
 */
export function isChartAction(action: Action): action is ChartAction {
  return action?.type === ActionType.SHOW_CHART
}

/**
 * Type guard to check if action is TableAction
 */
export function isTableAction(action: Action): action is TableAction {
  return action?.type === ActionType.SHOW_TABLE
}
