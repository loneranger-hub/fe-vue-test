import { describe, it, expect } from 'vitest'
import { widgetRegistry } from '~/utils/widgetRegistry'
import { WidgetComponent } from '~/constants/actionTypes'
import type { Component } from 'vue'

describe('WidgetRegistry', () => {
  const mockComponent1: Component = { name: 'MockComponent1' } as Component
  const mockComponent2: Component = { name: 'MockComponent2' } as Component

  describe('default components', () => {
    it('should have CHART component registered', () => {
      const component = widgetRegistry.get(WidgetComponent.CHART)
      expect(component).toBeDefined()
    })

    it('should have TABLE component registered', () => {
      const component = widgetRegistry.get(WidgetComponent.TABLE)
      expect(component).toBeDefined()
    })

    it('should return registered names including defaults', () => {
      const names = widgetRegistry.getRegisteredNames()
      expect(names).toContain(WidgetComponent.CHART)
      expect(names).toContain(WidgetComponent.TABLE)
    })
  })

  describe('register', () => {
    it('should register a new component', () => {
      widgetRegistry.register('TestWidget', mockComponent1)
      expect(widgetRegistry.has('TestWidget')).toBe(true)
    })

    it('should overwrite existing component', () => {
      widgetRegistry.register('TestWidget', mockComponent1)
      widgetRegistry.register('TestWidget', mockComponent2)

      const component = widgetRegistry.get('TestWidget')
      expect(component).toBe(mockComponent2)
    })
  })

  describe('get', () => {
    it('should return registered component', () => {
      widgetRegistry.register('TestWidget', mockComponent1)
      const component = widgetRegistry.get('TestWidget')
      expect(component).toBe(mockComponent1)
    })

    it('should return undefined for unregistered component', () => {
      const component = widgetRegistry.get('NonExistentWidget')
      expect(component).toBeUndefined()
    })
  })

  describe('has', () => {
    it('should return true for registered component', () => {
      widgetRegistry.register('TestWidget', mockComponent1)
      expect(widgetRegistry.has('TestWidget')).toBe(true)
    })

    it('should return false for unregistered component', () => {
      expect(widgetRegistry.has('NonExistentWidget')).toBe(false)
    })
  })

  describe('getRegisteredNames', () => {
    it('should return array of registered component names', () => {
      const names = widgetRegistry.getRegisteredNames()
      expect(Array.isArray(names)).toBe(true)
      expect(names.length).toBeGreaterThan(0)
    })

    it('should include newly registered components', () => {
      widgetRegistry.register('NewWidget', mockComponent1)
      const names = widgetRegistry.getRegisteredNames()
      expect(names).toContain('NewWidget')
    })
  })
})
