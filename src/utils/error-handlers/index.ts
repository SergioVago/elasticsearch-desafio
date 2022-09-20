import { Response } from 'express'
import { ZodError } from 'zod'
import { zodErrorHandler } from './zod-error-handler'
import { errorHandler } from './error-handler'

export function errorHandlers(error: unknown, response: Response) {
  if (error instanceof ZodError) {
    return zodErrorHandler(error, response)
  }

  if (error instanceof Error) {
    return errorHandler(error, response)
  }

  return response.status(400).json({
    success: false,
    type: 'unknown_error',
    error,
  })
}
