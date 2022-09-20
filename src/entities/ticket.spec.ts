import { describe, expect, it } from 'vitest'
import { Ticket } from './ticket'

describe('Ticket entity', () => {
  it('should be able to init a ticket without id', () => {
    const ticket = new Ticket({
      company: 'X',
    } as any)

    expect(ticket).toBeInstanceOf(Ticket)
  })

  it('should be able to get all ticket props', () => {
    const ticket = new Ticket(
      {
        company: 'X',
        departureTime: 'X',
      } as any,
      '1',
    )

    expect(ticket.all).toStrictEqual({
      id: '1',
      company: 'X',
      departureTime: 'X',
    })
  })

  it('should be able to get ticket id', () => {
    const id = '1'

    const ticket = new Ticket(
      {
        company: 'X',
      } as any,
      id,
    )

    expect(ticket.id).toStrictEqual(id)
  })

  it('should be able to set ticket id', () => {
    const id = '1'

    const ticket = new Ticket(
      {
        company: 'X',
      } as any,
      id,
    )

    ticket.id = '2'

    expect(ticket.id).toStrictEqual('2')
  })

  it('should be able to get ticket company', () => {
    const id = '1'

    const ticket = new Ticket(
      {
        company: 'X',
      } as any,
      id,
    )

    expect(ticket.company).toStrictEqual('X')
  })

  it('should be able to get ticket stops places', () => {
    const id = '1'

    const ticket = new Ticket(
      {
        stopsPlaces: ['X', 'Y', 'Z'],
      } as any,
      id,
    )

    expect(ticket.stopsPlaces).toStrictEqual(['X', 'Y', 'Z'])
  })
})
