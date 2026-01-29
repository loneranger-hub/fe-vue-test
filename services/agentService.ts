import type { AssistantResponse, ChartData } from "~/types/models";
import type { Action, ChartAction, TableAction } from "~/types/actions";
import { ActionType } from "~/constants/actionTypes";

/**
 * Service for handling AI agent interactions
 * Separates business logic from UI concerns
 */
export class AgentService {
  /**
   * Simulates thinking delay
   */
  async simulateThinkingDelay(delay: number = 2000): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  /**
   * Converts chart action to table action
   */
  chartToTable(chartData: ChartAction): TableAction | null {
    if (!chartData || !chartData.data) return null;

    const data = chartData.data.map((value: number, index: number) => ({
      label: chartData.labels?.[index] || `Item ${index + 1}`,
      value,
    }));

    return {
      type: ActionType.SHOW_TABLE,
      title: chartData.title ? `${chartData.title} (List View)` : "Data List",
      data,
    };
  }

  /**
   * Converts table action to chart action
   */
  tableToChart(tableData: TableAction): ChartAction | null {
    if (!tableData || !Array.isArray(tableData.data)) return null;

    const data = tableData.data.map((item: any) => item.value);
    const labels = tableData.data.map((item: any) => item.label);

    return {
      type: ActionType.SHOW_CHART,
      title: tableData.title
        ? tableData.title.replace(" (List View)", "")
        : "Chart",
      data,
      labels,
    };
  }

  /**
   * Generates mock chart data
   */
  generateMockChartData(): ChartAction {
    return {
      type: ActionType.SHOW_CHART,
      data: [10, 20, 15, 30, 25, 35, 40, 50, 90, 70, 80, 100],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: "Sales Overview",
    };
  }

  /**
   * Processes user input and generates appropriate response
   * This is where you would integrate with a real AI API
   */
  async processUserInput(
    userInput: string,
    previousAction: Action | null,
  ): Promise<AssistantResponse> {
    const lowerInput = userInput.toLowerCase();

    // Handle view switching
    if (
      lowerInput.includes("instead") &&
      (lowerInput.includes("table") || lowerInput.includes("list")) &&
      previousAction &&
      previousAction.type === ActionType.SHOW_CHART
    ) {
      const tableAction = this.chartToTable(previousAction as ChartAction);
      return {
        message: "Sure, switching to list view.",
        action: tableAction || undefined,
      };
    }

    if (
      lowerInput.includes("instead") &&
      lowerInput.includes("chart") &&
      previousAction &&
      previousAction.type === ActionType.SHOW_TABLE
    ) {
      const chartAction = this.tableToChart(previousAction as TableAction);
      return {
        message: "Sure, switching to chart view.",
        action: chartAction || undefined,
      };
    }

    // Handle sales/chart requests
    if (
      lowerInput.includes("sale") ||
      lowerInput.includes("analyze") ||
      lowerInput.includes("chart") ||
      lowerInput.includes("show")
    ) {
      const action = this.generateMockChartData();
      return {
        message: "I've analyzed the 2025 data. Revenue is up 15%.",
        action,
      };
    }

    // Handle greetings
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return {
        message: "Hello handsome",
      };
    }

    // Default response
    return {
      message:
        "Please type 'sales' to see a sample chart.",
    };
  }
}

// Export singleton instance
export const agentService = new AgentService();
