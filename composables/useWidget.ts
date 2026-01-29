import { useChartStore } from '~/stores/chartStore'
import { widgetService } from '~/services/widgetService'
import { widgetRegistry } from '~/utils/widgetRegistry'
import { ErrorHandler } from '~/utils/errorHandler'
import type { Action } from '~/types/actions'
import type { WidgetComponent } from '~/types/models'

/**
 * Composable for widget-related operations
 * Handles widget generation and component resolution
 */
export function useWidget() {
  const chartStore = useChartStore()

  /**
   * Processes an action and sets the corresponding widget component
   */
  const handleAction = (action: Action | null | undefined): void => {
    if (!action) return

    try {
      // Validate action
      if (!widgetService.validateAction(action)) {
        throw new Error(`Invalid action: ${action.type}`)
      }

      // Generate widget data from action
      const widgetData = widgetService.processAction(action)
      if (!widgetData) {
        throw new Error(`Failed to process action: ${action.type}`)
      }

      // Get component from registry
      const component = widgetRegistry.get(widgetData.component)
      if (!component) {
        throw new Error(`Widget component not found: ${widgetData.component}`)
      }

      // Create widget component instance
      const widgetComponent: WidgetComponent = {
        component,
        props: widgetData.props || {},
      }

      // Set component in store
      chartStore.setComponent(widgetComponent)
      chartStore.setProcessing(false)
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.handleWidgetError(error, action?.type),
      )
      chartStore.setProcessing(false)
    }
  }

  /**
   * Clears current widget
   */
  const clearWidget = (): void => {
    chartStore.clearChart()
  }

  return {
    handleAction,
    clearWidget,
  }
}
