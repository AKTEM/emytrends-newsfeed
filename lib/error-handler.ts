// Global error handler utility
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: any): { message: string; statusCode: number } {
  console.error('API Error:', error);
  
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    };
  }
  
  if (error?.response) {
    return {
      message: error.response.data?.message || 'API request failed',
      statusCode: error.response.status || 500
    };
  }
  
  if (error?.message) {
    return {
      message: error.message,
      statusCode: 500
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    statusCode: 500
  };
}

export function safeAsync<T>(
  asyncFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  return asyncFn()
    .then((result) => {
      // Log successful operations for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('Async operation succeeded');
      }
      return result;
    })
    .catch((error) => {
      console.error('Async operation failed:', error);
      return fallback;
    });
}

export function withErrorBoundary<T extends any[]>(
  fn: (...args: T) => any,
  fallback: any = null
) {
  return (...args: T) => {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.catch((error) => {
          console.error('Function error:', error);
          return fallback;
        });
      }
      return result;
    } catch (error) {
      console.error('Function error:', error);
      return fallback;
    }
  };
}