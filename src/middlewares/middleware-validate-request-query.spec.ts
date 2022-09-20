import { describe, expect, it, vi } from 'vitest'
import {
  middlewareValidateRequestQuery,
  RequestQueryParams,
} from './middleware-validate-request-query'

const nextFunction = {
  next: () => {},
}

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

const validRequiredQueryParams: RequestQueryParams = {
  originPlace: 'VIX',
  destinationPlace: 'REC',
  outboundDate: '2022-10-08T03:00:00.000Z',
  adults: 1,
}

describe('validate request query params', () => {
  it('should be able to validate all params', () => {
    const allQueryParams: RequestQueryParams = {
      ...validRequiredQueryParams,
      inboundDate: '2022-10-10T03:00:00.000Z',
      cabinClass: 'economica',
      children: 1,
      infants: 1,
    }

    const nextSpy = vi.spyOn(nextFunction, 'next')

    const request: any = {
      query: allQueryParams,
    }

    const response: any = {}

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(nextSpy).toBeCalled()
  })

  it('should be able to validate required params', () => {
    const request: any = {
      query: validRequiredQueryParams,
    }

    const response: any = {}

    const nextSpy = vi.spyOn(nextFunction, 'next')

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(nextSpy).toBeCalled()
  })

  it('should not be able to continue without one of the required params', () => {
    const queryParams: Omit<RequestQueryParams, 'adults'> = {
      originPlace: 'VIX',
      destinationPlace: 'REC',
      outboundDate: '2022-10-08T03:00:00.000Z',
      // adults: 1,
    }

    const request: any = {
      query: queryParams,
    }

    const response = new Response() as any

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(response.code).toBe(400)
  })

  it('should not be able to continue with inbound date equals outbound date', () => {
    const queryParams: RequestQueryParams = {
      ...validRequiredQueryParams,
      outboundDate: '2022-10-08T03:00:00.000Z',
      inboundDate: '2022-10-08T03:00:00.000Z',
    }

    const request: any = {
      query: queryParams,
    }

    const response = new Response() as any

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(response.code).toBe(400)
  })

  it('should not be able to continue with inbound date before outbound date', () => {
    const queryParams: RequestQueryParams = {
      ...validRequiredQueryParams,
      outboundDate: '2022-10-08T03:00:00.000Z',
      inboundDate: '2022-10-07T03:00:00.000Z',
    }

    const request: any = {
      query: queryParams,
    }

    const response = new Response() as any

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(response.code).toBe(400)
  })

  it('should not be able to continue with invalid cabin class', () => {
    const queryParams: RequestQueryParams = {
      ...validRequiredQueryParams,
      cabinClass: 'not-valid-cabin',
    }

    const request: any = {
      query: queryParams,
    }

    const response = new Response() as any

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(response.code).toBe(400)
  })

  it('should not be able to continue with invalid number of adults', () => {
    const queryParams: RequestQueryParams = {
      ...validRequiredQueryParams,
      adults: 999,
    }

    const request: any = {
      query: queryParams,
    }

    const response = new Response() as any

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(response.code).toBe(400)
  })

  it('should not be able to continue with invalid number of children', () => {
    const queryParams: RequestQueryParams = {
      ...validRequiredQueryParams,
      children: 999,
    }

    const request: any = {
      query: queryParams,
    }

    const response = new Response() as any

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(response.code).toBe(400)
  })

  it('should not be able to continue with invalid number of infants', () => {
    const queryParams: RequestQueryParams = {
      ...validRequiredQueryParams,
      infants: 999,
    }

    const request: any = {
      query: queryParams,
    }

    const response = new Response() as any

    middlewareValidateRequestQuery(request, response, nextFunction.next)

    expect(response.code).toBe(400)
  })
})
