import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ErrorHandler, WidgetError, ActionError } from '~/utils/errorHandler'

describe('ErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('WidgetError', () => {
    it('should create WidgetError with message and code', () => {
      const error = new WidgetError('Test error', 'TEST_CODE')
      expect(error.message).toBe('Test error')
      expect(error.code).toBe('TEST_CODE')
      expect(error.name).toBe('WidgetError')
    })

    it('should include original error', () => {
      const originalError = new Error('Original')
      const error = new WidgetError('Test error', 'TEST_CODE', originalError)
      expect(error.originalError).toBe(originalError)
    })
  })

  describe('ActionError', () => {
    it('should create ActionError with message and code', () => {
      const error = new ActionError('Test error', 'TEST_CODE')
      expect(error.message).toBe('Test error')
      expect(error.code).toBe('TEST_CODE')
      expect(error.name).toBe('ActionError')
    })

    it('should include original error', () => {
      const originalError = new Error('Original')
      const error = new ActionError('Test error', 'TEST_CODE', originalError)
      expect(error.originalError).toBe(originalError)
    })
  })

  describe('handleWidgetError', () => {
    it('should return WidgetError instance as-is', () => {
      const widgetError = new WidgetError('Test', 'CODE')
      const result = ErrorHandler.handleWidgetError(widgetError)
      expect(result).toBe(widgetError)
    })

    it('should create WidgetError from Error', () => {
      const error = new Error('Test error')
      const result = ErrorHandler.handleWidgetError(error)
      expect(result).toBeInstanceOf(WidgetError)
      expect(result.message).toBe('Widget error occurred')
      expect(result.code).toBe('WIDGET_ERROR')
      expect(result.originalError).toBe(error)
    })

    it('should create WidgetError with widget name', () => {
      const error = new Error('Test error')
      const result = ErrorHandler.handleWidgetError(error, 'TestWidget')
      expect(result.message).toBe('Failed to load widget: TestWidget')
    })

    it('should handle non-Error values', () => {
      const result = ErrorHandler.handleWidgetError('string error')
      expect(result).toBeInstanceOf(WidgetError)
      expect(result.originalError).toBeUndefined()
    })
  })

  describe('handleActionError', () => {
    it('should return ActionError instance as-is', () => {
      const actionError = new ActionError('Test', 'CODE')
      const result = ErrorHandler.handleActionError(actionError)
      expect(result).toBe(actionError)
    })

    it('should create ActionError from Error', () => {
      const error = new Error('Test error')
      const result = ErrorHandler.handleActionError(error)
      expect(result).toBeInstanceOf(ActionError)
      expect(result.message).toBe('Action error occurred')
      expect(result.code).toBe('ACTION_ERROR')
      expect(result.originalError).toBe(error)
    })

    it('should create ActionError with action type', () => {
      const error = new Error('Test error')
      const result = ErrorHandler.handleActionError(error, 'show_chart')
      expect(result.message).toBe('Failed to process action: show_chart')
    })

    it('should handle non-Error values', () => {
      const result = ErrorHandler.handleActionError('string error')
      expect(result).toBeInstanceOf(ActionError)
      expect(result.originalError).toBeUndefined()
    })
  })

  describe('logError', () => {
    it('should log error with correct format', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new WidgetError('Test error', 'TEST_CODE')

      ErrorHandler.logError(error)

      expect(consoleSpy).toHaveBeenCalledWith(
        '[WidgetError] Test error',
        expect.objectContaining({
          code: 'TEST_CODE',
        }),
      )
      consoleSpy.mockRestore()
    })

    it('should log ActionError correctly', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new ActionError('Test error', 'TEST_CODE')

      ErrorHandler.logError(error)

      expect(consoleSpy).toHaveBeenCalledWith(
        '[ActionError] Test error',
        expect.objectContaining({
          code: 'TEST_CODE',
        }),
      )
      consoleSpy.mockRestore()
    })

    it('should log regular Error correctly', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new Error('Test error')

      ErrorHandler.logError(error)

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should include original error in log', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const originalError = new Error('Original')
      const error = new WidgetError('Test error', 'TEST_CODE', originalError)

      ErrorHandler.logError(error)

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          originalError,
        }),
      )
      consoleSpy.mockRestore()
    })
  })
})
