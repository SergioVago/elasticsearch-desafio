import { describe, expect, it } from 'vitest'
import { errorHandler } from './error-handler'

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

describe('Error Handler', () => {
  it('should be able to handle a Error type event', () => {
    const error = new Error('Error')
    const response = new Response() as any

    errorHandler(error, response)

    expect(response.code).toBe(400)
  })

  it('should be able to handle a non Error type event', () => {
    const error = 'Error'
    const response = new Response() as any

    expect(() => {
      errorHandler(error, response)
    }).toThrow('this error is not a Error')
  })
})
