import { getClient } from '../client/elasticsearch'
import { Ticket } from '../entities/ticket'

export async function generateTicketData(
  shouldUploadToElasticsearch?: boolean,
) {
  const newTicket1 = new Ticket(
    {
      company: 'AZUL',
      departureTime: '2022-10-08T22:00:00.000Z',
      departureStation: 'VIX',
      arrivalTime: '2022-10-10T03:00:00.000Z',
      arrivalStation: 'REC',
      stopsPlaces: ['CNF', 'CHZ'],
      remainingSeats: 2,
      cabinClass: 'economica',
    },
    'b480a618-a74a-4184-9a84-ed44d758d79a',
  )
  const newTicket2 = new Ticket(
    {
      company: 'AZUL',
      departureTime: '2022-10-11T03:00:00.000Z',
      departureStation: 'VIX',
      arrivalTime: '2022-10-12T03:00:00.000Z',
      arrivalStation: 'REC',
      stopsPlaces: ['CNF', 'CHZ'],
      remainingSeats: 4,
      cabinClass: 'premium',
    },
    'b480a618-a74a-4184-9a84-ed44d758d79b',
  )
  const newTicket3 = new Ticket(
    {
      departureTime: '2022-10-11T03:00:00.000Z',
      arrivalTime: '2022-10-12T03:00:00.000Z',
      stopsPlaces: ['CNF', 'CHZ'],
      remainingSeats: 2,
      cabinClass: 'economica',
      company: 'GOL',
      departureStation: 'REC',
      arrivalStation: 'VIX',
    },
    'b480a618-a74a-4184-9a84-ed44d758d79c',
  )
  const newTicket4 = new Ticket(
    {
      company: 'AZUL',
      departureStation: 'VIX',
      arrivalTime: '2022-10-12T03:00:00.000Z',
      arrivalStation: 'REC',
      stopsPlaces: ['CNF', 'CHZ'],
      remainingSeats: 2,
      cabinClass: 'economica',
      departureTime: '2022-10-10T03:00:00.000Z',
    },
    'b480a618-a74a-4184-9a84-ed44d758d79d',
  )

  if (shouldUploadToElasticsearch) {
    newTicket1.id = ''
    newTicket2.id = ''
    newTicket3.id = ''
    newTicket4.id = ''

    const client = getClient()

    for (let index = 0; index < 100; index++) {
      await client.index({
        index: 'tickets',
        document: newTicket1.all,
      })
      await client.index({
        index: 'tickets',
        document: newTicket2.all,
      })
      await client.index({
        index: 'tickets',
        document: newTicket3.all,
      })
      await client.index({
        index: 'tickets',
        document: newTicket4.all,
      })
    }
  }

  return [newTicket1, newTicket2, newTicket3, newTicket4]
}
