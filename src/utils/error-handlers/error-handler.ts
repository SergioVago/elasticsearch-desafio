import { Response } from 'express'

export function errorHandler(error: unknown, response: Response) {
  if (error instanceof Error) {
    return response.status(400).json({
      success: false,
      type: 'error',
      error: error.message,
    })
  }

  throw new Error('this error is not a Error')
}
