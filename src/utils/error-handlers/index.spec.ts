import { describe, expect, it } from 'vitest'
import { errorHandlers } from '.'

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

describe('Error Handlers', () => {
  it('should be able to handle a Unknown Error type event', () => {
    const error = 'Error'
    const response = new Response() as any

    errorHandlers(error, response)

    expect(response.code).toBe(400)
  })
})
