import { isSameDay } from 'date-fns'
import { Ticket } from '../../entities/ticket'
import { RequestQueryParams } from '../../middlewares/middleware-validate-request-query'
import { generateTicketData } from '../../sample/tickets'
import {
  TicketsRepository,
  TicketsRepositoryResponse,
} from '../tickets-repository'

export class InMemoryTicketsRepository implements TicketsRepository {
  public items: Ticket[] = []
  public requestId: string = '1'

  public async generateSampleData() {
    const tickets = await generateTicketData()

    this.items = tickets
  }

  public async findTickets(
    params: RequestQueryParams,
  ): Promise<TicketsRepositoryResponse> {
    const {
      destinationPlace,
      originPlace,
      adults,
      outboundDate,
      children,
      inboundDate,
    } = params

    const filteredTickets = this.items.filter((item) => {
      const sameDestiny = item.arrivalStation === destinationPlace
      const sameOrigin = item.departureStation === originPlace
      const hasRemainingSeats =
        item.remainingSeats >= adults + Number(children || 0)
      const sameOutboundDate = isSameDay(
        new Date(item.departureTime),
        new Date(outboundDate),
      )
      const sameInboundDate = inboundDate
        ? isSameDay(new Date(item.arrivalTime), new Date(inboundDate))
        : true

      return (
        sameDestiny &&
        sameOrigin &&
        hasRemainingSeats &&
        sameOutboundDate &&
        sameInboundDate
      )
    })

    const parsedTickets = filteredTickets.map((item) => item.getParsedTicket())

    return {
      tickets: parsedTickets,
      requestId: '1',
    }
  }

  public async findTicketsUsingRequestId(
    requestId: string,
  ): Promise<TicketsRepositoryResponse> {
    const parsedItems = this.items.map((item) => item.getParsedTicket())

    if (requestId === '1') {
      return {
        requestId: this.requestId,
        tickets: parsedItems,
      }
    } else {
      return {
        requestId,
        tickets: [],
      }
    }
  }
}
