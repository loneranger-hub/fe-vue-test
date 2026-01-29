import type { Component } from 'vue'
import { WidgetComponent } from '~/constants/actionTypes'
import WidgetChart from '~/components/WidgetChart.vue'
import WidgetTable from '~/components/WidgetTable.vue'

/**
 * Registry for mapping widget component names to Vue components
 * This allows for dynamic component loading and easy extensibility
 */
class WidgetRegistry {
  private components: Map<string, Component> = new Map()

  constructor() {
    this.registerDefaultComponents()
  }

  /**
   * Register default widget components
   */
  private registerDefaultComponents(): void {
    this.register(WidgetComponent.CHART, WidgetChart)
    this.register(WidgetComponent.TABLE, WidgetTable)
  }

  /**
   * Register a new widget component
   */
  register(name: string, component: Component): void {
    this.components.set(name, component)
  }

  /**
   * Get a widget component by name
   */
  get(name: string): Component | undefined {
    return this.components.get(name)
  }

  /**
   * Check if a widget component is registered
   */
  has(name: string): boolean {
    return this.components.has(name)
  }

  /**
   * Get all registered widget names
   */
  getRegisteredNames(): string[] {
    return Array.from(this.components.keys())
  }
}

// Export singleton instance
export const widgetRegistry = new WidgetRegistry()
