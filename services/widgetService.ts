import type { WidgetComponent } from "~/types/models";
import type { Action, ChartAction, TableAction } from "~/types/actions";
import { WidgetComponent as WidgetComponentName } from "~/constants/actionTypes";
import { isChartAction, isTableAction } from "~/types/actions";

/**
 * Service for handling widget generation and component mapping
 */
export class WidgetService {
  /**
   * Generates widget component data from chart action
   */
  generateChartWidget(action: ChartAction): WidgetComponent {
    return {
      component: WidgetComponentName.CHART,
      props: {
        title: action.title || "Chart Data",
        data: action.data || [],
        labels: action.labels || [],
      },
    };
  }

  /**
   * Generates widget component data from table action
   */
  generateTableWidget(action: TableAction): WidgetComponent {
    const data = action.data || [];
    let columns: string[] = [];

    if (data.length > 0) {
      columns = Object.keys(data[0]).map(
        (key) => key.charAt(0).toUpperCase() + key.slice(1),
      );
    }

    return {
      component: WidgetComponentName.TABLE,
      props: {
        title: action.title || "Data Table",
        columns: action.columns || columns,
        rows: data,
      },
    };
  }

  /**
   * Processes action and generates appropriate widget component
   */
  processAction(action: Action | null | undefined): WidgetComponent | null {
    if (!action) return null;

    if (isChartAction(action)) {
      return this.generateChartWidget(action);
    }

    if (isTableAction(action)) {
      return this.generateTableWidget(action);
    }

    return null;
  }

  /**
   * Validates action data
   */
  validateAction(action: Action): boolean {
    if (isChartAction(action)) {
      return (
        Array.isArray(action.data) &&
        Array.isArray(action.labels) &&
        action.data.length === action.labels.length
      );
    }

    if (isTableAction(action)) {
      return Array.isArray(action.data);
    }

    return false;
  }
}

// Export singleton instance
export const widgetService = new WidgetService();
