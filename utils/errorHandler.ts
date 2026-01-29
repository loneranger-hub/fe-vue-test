/**
 * Error types for better error handling
 */
export class WidgetError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error,
  ) {
    super(message)
    this.name = 'WidgetError'
  }
}

export class ActionError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error,
  ) {
    super(message)
    this.name = 'ActionError'
  }
}

/**
 * Error handler utility
 */
export class ErrorHandler {
  /**
   * Handle widget-related errors
   */
  static handleWidgetError(error: unknown, widgetName?: string): WidgetError {
    if (error instanceof WidgetError) {
      return error
    }

    const message = widgetName
      ? `Failed to load widget: ${widgetName}`
      : 'Widget error occurred'

    return new WidgetError(
      message,
      'WIDGET_ERROR',
      error instanceof Error ? error : undefined,
    )
  }

  /**
   * Handle action-related errors
   */
  static handleActionError(error: unknown, actionType?: string): ActionError {
    if (error instanceof ActionError) {
      return error
    }

    const message = actionType
      ? `Failed to process action: ${actionType}`
      : 'Action error occurred'

    return new ActionError(
      message,
      'ACTION_ERROR',
      error instanceof Error ? error : undefined,
    )
  }

  /**
   * Log error to console (in production, this would go to error tracking service)
   */
  static logError(error: Error | WidgetError | ActionError): void {
    console.error(`[${error.name}] ${error.message}`, {
      code: 'code' in error ? error.code : undefined,
      originalError: 'originalError' in error ? error.originalError : undefined,
      stack: error.stack,
    })
  }
}
