/**
 * Action types that can be performed by the AI agent
 */
export enum ActionType {
  SHOW_CHART = 'show_chart',
  SHOW_TABLE = 'show_table',
  SHOW_METRIC = 'show_metric',
  SHOW_LIST = 'show_list',
}

/**
 * Widget component names
 */
export enum WidgetComponent {
  CHART = 'WidgetChart',
  TABLE = 'WidgetTable',
}

/**
 * Configuration constants
 */
export const CONFIG = {
  TYPEWRITER_DELAY: 30,
  THINKING_DELAY: 2000,
  CHART_COLORS: {
    BACKGROUND: 'rgba(102, 126, 234, 0.8)',
    BORDER: 'rgba(102, 126, 234, 1)',
  },
} as const
