import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { AgentService } from "~/services/agentService";
import { ActionType } from "~/constants/actionTypes";
import type { ChartAction, TableAction } from "~/types/actions";

describe("AgentService", () => {
  let service: AgentService;

  beforeEach(() => {
    service = new AgentService();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("simulateThinkingDelay", () => {
    it("should resolve after default delay", async () => {
      const promise = service.simulateThinkingDelay();
      vi.advanceTimersByTime(2000);
      await expect(promise).resolves.toBeUndefined();
    });

    it("should resolve after custom delay", async () => {
      const promise = service.simulateThinkingDelay(1000);
      vi.advanceTimersByTime(1000);
      await expect(promise).resolves.toBeUndefined();
    });
  });

  describe("chartToTable", () => {
    it("should convert chart action to table action", () => {
      const chartAction: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20, 30],
        labels: ["A", "B", "C"],
        title: "Test Chart",
      };

      const result = service.chartToTable(chartAction);

      expect(result).not.toBeNull();
      expect(result?.type).toBe(ActionType.SHOW_TABLE);
      expect(result?.title).toBe("Test Chart (List View)");
      expect(result?.data).toEqual([
        { label: "A", value: 10 },
        { label: "B", value: 20 },
        { label: "C", value: 30 },
      ]);
    });

    it("should handle missing labels", () => {
      const chartAction: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: [],
        title: "Test Chart",
      };

      const result = service.chartToTable(chartAction);

      expect(result?.data).toEqual([
        { label: "Item 1", value: 10 },
        { label: "Item 2", value: 20 },
      ]);
    });

    it("should handle missing title", () => {
      const chartAction: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10],
        labels: ["A"],
        title: "",
      };

      const result = service.chartToTable(chartAction);

      expect(result?.title).toBe("Data List");
    });

    it("should return null for null input", () => {
      expect(service.chartToTable(null as any)).toBeNull();
    });

    it("should return null for missing data", () => {
      const chartAction = {
        type: ActionType.SHOW_CHART,
        labels: ["A"],
        title: "Test",
      } as any;

      expect(service.chartToTable(chartAction)).toBeNull();
    });
  });

  describe("tableToChart", () => {
    it("should convert table action to chart action", () => {
      const tableAction: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [
          { label: "A", value: 10 },
          { label: "B", value: 20 },
        ],
        title: "Test Table",
      };

      const result = service.tableToChart(tableAction);

      expect(result).not.toBeNull();
      expect(result?.type).toBe(ActionType.SHOW_CHART);
      expect(result?.title).toBe("Test Table");
      expect(result?.data).toEqual([10, 20]);
      expect(result?.labels).toEqual(["A", "B"]);
    });

    it('should remove "(List View)" from title', () => {
      const tableAction: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: "A", value: 10 }],
        title: "Test (List View)",
      };

      const result = service.tableToChart(tableAction);

      expect(result?.title).toBe("Test");
    });

    it("should handle missing title", () => {
      const tableAction: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: "A", value: 10 }],
        title: "",
      };

      const result = service.tableToChart(tableAction);

      expect(result?.title).toBe("Chart");
    });

    it("should return null for null input", () => {
      expect(service.tableToChart(null as any)).toBeNull();
    });

    it("should return null for non-array data", () => {
      const tableAction = {
        type: ActionType.SHOW_TABLE,
        data: "not an array",
        title: "Test",
      } as any;

      expect(service.tableToChart(tableAction)).toBeNull();
    });
  });

  describe("generateMockChartData", () => {
    it("should generate chart action with correct structure", () => {
      const result = service.generateMockChartData();

      expect(result.type).toBe(ActionType.SHOW_CHART);
      expect(result.title).toBe("Sales Overview");
      expect(result.data).toEqual([
        10, +20, +15, +30, +25, +35, +40, +50, +90, +70, +80, +100,
      ]);
      expect(result.labels).toEqual([
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
      ]);
    });
  });

  describe("processUserInput", () => {
    it("should handle chart to table conversion request", async () => {
      const previousAction: ChartAction = {
        type: ActionType.SHOW_CHART,
        data: [10, 20],
        labels: ["A", "B"],
        title: "Test Chart",
      };

      const result = await service.processUserInput(
        "change to table instead",
        previousAction,
      );

      expect(result.message).toBe("Sure, switching to list view.");
      expect(result.action?.type).toBe(ActionType.SHOW_TABLE);
    });

    it("should handle table to chart conversion request", async () => {
      const previousAction: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [{ label: "A", value: 10 }],
        title: "Test Table",
      };

      const result = await service.processUserInput(
        "show chart instead",
        previousAction,
      );

      expect(result.message).toBe("Sure, switching to chart view.");
      expect(result.action?.type).toBe(ActionType.SHOW_CHART);
    });

    it("should handle sales request", async () => {
      const result = await service.processUserInput("show me sales", null);

      expect(result.message).toBe("I've analyzed the 2025 data. Revenue is up 15%.");
      expect(result.action?.type).toBe(ActionType.SHOW_CHART);
    });

    it("should handle analyze request", async () => {
      const result = await service.processUserInput("analyze data", null);

      expect(result.message).toBe("I've analyzed the 2025 data. Revenue is up 15%.");
      expect(result.action).toBeDefined();
    });

    it("should handle chart request", async () => {
      const result = await service.processUserInput("show chart", null);

      expect(result.message).toBe("I've analyzed the 2025 data. Revenue is up 15%.");
      expect(result.action).toBeDefined();
    });

    it("should handle show request", async () => {
      const result = await service.processUserInput("show report", null);

      expect(result.message).toBe("I've analyzed the 2025 data. Revenue is up 15%.");
      expect(result.action).toBeDefined();
    });

    it("should handle greeting", async () => {
      const result = await service.processUserInput("hello", null);

      expect(result.message).toBe(
        "Hello handsome",
      );
      expect(result.action).toBeUndefined();
    });

    it("should handle hi greeting", async () => {
      const result = await service.processUserInput("hi there", null);

      expect(result.message).toBe(
        "Hello handsome",
      );
    });

    it("should return default response for unknown input", async () => {
      const result = await service.processUserInput("random text", null);

      expect(result.message).toContain("Please type 'sales'");
      expect(result.action).toBeUndefined();
    });

    it("should handle case-insensitive input", async () => {
      const result = await service.processUserInput("HELLO", null);

      expect(result.message).toBe(
        "Hello handsome",
      );
    });

    it("should not convert when previous action is null", async () => {
      const result = await service.processUserInput(
        "change to table instead",
        null,
      );

      expect(result.action).toBeUndefined();
    });

    it("should not convert when previous action type does not match", async () => {
      const previousAction: TableAction = {
        type: ActionType.SHOW_TABLE,
        data: [],
        title: "Test",
      };

      const result = await service.processUserInput(
        "change to table instead",
        previousAction,
      );

      expect(result.action).toBeUndefined();
    });
  });
});
