import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import { zodErrorHandler } from './zod-error-handler'

class Response {
  public code = 0
  public body = {}

  public status(code: number) {
    this.code = code
    return this
  }

  public json(obj: any) {
    this.body = obj
    return this
  }
}

describe('ZodError Handler', () => {
  it('should be able to handle a ZodError type event', () => {
    const error = new ZodError([])
    const response = new Response() as any

    zodErrorHandler(error, response)

    expect(response.code).toBe(400)
  })

  it('should be able to handle a non ZodError type event', () => {
    const error = 'Error'
    const response = new Response() as any

    expect(() => {
      zodErrorHandler(error, response)
    }).toThrow('this error is not a ZodError')
  })
})
