import { describe, expect, it } from 'vitest'
// import { Ticket } from '../entities/ticket'
import { InMemoryTicketsRepository } from '../repositories/in-memory/in-memory-tickets-repository'
import { generateTicketData } from '../sample/tickets'

describe('Get Tickets', async () => {
  it('should be able to get tickets using request id 1', async () => {
    const ticketsRepository = new InMemoryTicketsRepository()

    await ticketsRepository.generateSampleData()

    const sampleData = await generateTicketData()
    const parsedSampleData = sampleData.map((item) => item.getParsedTicket())

    await expect(
      ticketsRepository.findTicketsUsingRequestId('1'),
    ).resolves.toStrictEqual({
      tickets: parsedSampleData,
      requestId: '1',
    })
  })

  it('should be able to get empty tickets array not using requests id 1', async () => {
    const ticketsRepository = new InMemoryTicketsRepository()

    await ticketsRepository.generateSampleData()

    await expect(
      ticketsRepository.findTicketsUsingRequestId('any-other-id'),
    ).resolves.toStrictEqual({
      tickets: [],
      requestId: 'any-other-id',
    })
  })
})
