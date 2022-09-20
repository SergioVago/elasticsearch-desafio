import {
  TicketResponse,
  TicketsRepository,
} from '../repositories/tickets-repository'

interface GetTicketsUsingRequestIdRequest {
  requestId: string
}

interface GetTicketsUsingRequestIdResponse {
  tickets: TicketResponse[]
  requestId: string
}

export class GetTicketsUsingRequestId {
  constructor(private readonly ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute({
    requestId,
  }: GetTicketsUsingRequestIdRequest): Promise<GetTicketsUsingRequestIdResponse> {
    const ticketsResponse =
      await this.ticketsRepository.findTicketsUsingRequestId(requestId)

    return ticketsResponse
  }
}
