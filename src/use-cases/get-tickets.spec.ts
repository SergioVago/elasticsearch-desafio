import { describe, expect, it } from 'vitest'
import { RequestQueryParams } from '../middlewares/middleware-validate-request-query'
import { InMemoryTicketsRepository } from '../repositories/in-memory/in-memory-tickets-repository'

const validRequiredQueryParams: RequestQueryParams = {
  originPlace: 'VIX',
  destinationPlace: 'REC',
  outboundDate: '2022-10-08T10:00:00.000Z',
  adults: 1,
}

describe('Get Tickets', async () => {
  it('should be able to get tickets with required params', async () => {
    const ticketsRepository = new InMemoryTicketsRepository()

    await ticketsRepository.generateSampleData()

    await expect(
      ticketsRepository.findTickets(validRequiredQueryParams),
    ).resolves.toStrictEqual({
      tickets: [
        {
          arrivalStation: 'REC',
          arrivalTime: '2022-10-10T03:00:00.000Z',
          company: 'AZUL',
          departureStation: 'VIX',
          departureTime: '2022-10-08T22:00:00.000Z',
          legDurationTimeInMinutes: 1740,
          stopsPlaces: ['CNF', 'CHZ'],
          id: 'b480a618-a74a-4184-9a84-ed44d758d79a',
        },
      ],
      requestId: '1',
    })
  })

  it('should be able to get tickets with optional params', async () => {
    const ticketsRepository = new InMemoryTicketsRepository()

    await ticketsRepository.generateSampleData()

    const validRequiredQueryParamsWithOptionals: RequestQueryParams = {
      ...validRequiredQueryParams,
      inboundDate: '2022-10-10T03:00:00.000Z',
    }

    await expect(
      ticketsRepository.findTickets(validRequiredQueryParamsWithOptionals),
    ).resolves.toStrictEqual({
      tickets: [
        {
          arrivalStation: 'REC',
          arrivalTime: '2022-10-10T03:00:00.000Z',
          company: 'AZUL',
          departureStation: 'VIX',
          departureTime: '2022-10-08T22:00:00.000Z',
          legDurationTimeInMinutes: 1740,
          stopsPlaces: ['CNF', 'CHZ'],
          id: 'b480a618-a74a-4184-9a84-ed44d758d79a',
        },
      ],
      requestId: '1',
    })
  })
})
