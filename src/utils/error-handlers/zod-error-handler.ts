import { Response } from 'express'
import { ZodError } from 'zod'

export function zodErrorHandler(error: unknown, response: Response) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      success: false,
      type: 'zod_error',
      error,
    })
  }

  throw new Error('this error is not a ZodError')
}
