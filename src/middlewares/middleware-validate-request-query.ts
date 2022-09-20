import { isAfter } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { errorHandlers } from '../utils/error-handlers'
import { zodDateSchema } from '../utils/zod-utils/zod-date-schema'

export const RequestQuerySchema = z.object({
  originPlace: z.string(),
  destinationPlace: z.string(),
  outboundDate: zodDateSchema,
  inboundDate: zodDateSchema.optional(),
  cabinClass: z.enum(['economica', 'premium']).optional(),
  adults: z.number().min(1).max(8),
  children: z.number().min(0).max(8).optional(),
  infants: z.number().min(0).max(8).optional(),
})

export interface RequestQueryParams {
  originPlace: string // Local de origem (ex: VIX).
  destinationPlace: string // Local de destino (ex: REC).
  outboundDate: string // Data de saída em ISOString.
  inboundDate?: string // Data de retorno em ISOString. Não pode ser anterior a outboundDate.
  cabinClass?: string // Tipo de cabine. Pode ser economica ou premium.
  adults: number // Número de adultos (16+ anos). Deve ser entre 1 e 8.
  children?: number // Número de crianças (1-16 anos). Deve ser entre 0 e 8.
  infants?: number // Número de bebês(abaixo de 12 meses).Deve ser entre 0 e 8.
}

function validateIfInboundDateIsAfterOutboundDate(
  inboundDate: string,
  outboundDate: string,
) {
  const isInboundDateAfterOutboundDate = isAfter(
    new Date(inboundDate),
    new Date(outboundDate),
  )

  if (!isInboundDateAfterOutboundDate) {
    throw new Error('Inbound date cannot be before outbound date')
  }
}

export interface RequestWithValidQueryParams extends Request {
  validatedQueryParams?: RequestQueryParams
}

export function middlewareValidateRequestQuery(
  request: RequestWithValidQueryParams,
  response: Response,
  next: NextFunction,
) {
  const { query } = request

  try {
    const { outboundDate, inboundDate, cabinClass, children, infants } = query

    const parsedQueryParams: RequestQueryParams = {
      originPlace: String(query.originPlace),
      destinationPlace: String(query.destinationPlace),
      outboundDate: String(query.outboundDate),
      adults: Number(query.adults || 0),
    }

    if (inboundDate) {
      validateIfInboundDateIsAfterOutboundDate(
        String(inboundDate),
        String(outboundDate),
      )

      Object.assign(parsedQueryParams, {
        inboundDate: String(inboundDate),
      })
    }

    if (cabinClass) {
      Object.assign(parsedQueryParams, {
        cabinClass: String(cabinClass),
      })
    }

    if (children) {
      Object.assign(parsedQueryParams, {
        children: Number(children),
      })
    }

    if (infants) {
      Object.assign(parsedQueryParams, {
        infants: Number(infants),
      })
    }

    RequestQuerySchema.parse(parsedQueryParams) // Validate query params

    request.validatedQueryParams = parsedQueryParams

    next()
  } catch (error) {
    return errorHandlers(error, response)
  }
}
