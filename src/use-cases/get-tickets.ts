import { RequestQueryParams } from '../middlewares/middleware-validate-request-query'
import {
  TicketResponse,
  TicketsRepository,
} from '../repositories/tickets-repository'

interface GetTicketsRequest {
  requestQueryParams: RequestQueryParams
}

interface GetTicketsResponse {
  tickets: TicketResponse[]
  requestId: string
}

export class GetTickets {
  constructor(private readonly ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute({
    requestQueryParams,
  }: GetTicketsRequest): Promise<GetTicketsResponse> {
    const ticketsResponse = await this.ticketsRepository.findTickets(
      requestQueryParams,
    )

    return ticketsResponse
  }
}
