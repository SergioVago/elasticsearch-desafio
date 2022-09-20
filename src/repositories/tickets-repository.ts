import { RequestQueryParams } from '../middlewares/middleware-validate-request-query'

export interface TicketResponse {
  id: string // Id do voo.
  company: string // Nome da compania aérea.
  departureTime: string // Data de partida em ISOString.
  arrivalTime: string // Data de chegada em ISOString.
  departureStation: string // Local de partida (ex: VIX).
  arrivalStation: string // Local de chegada (ex: REC).
  legDurationTimeInMinutes: number // Tempo de voo.
  stopsPlaces: string[] // Locais de paradas (ex: [CNF, CHZ]).
}

export interface TicketsRepositoryResponse {
  tickets: TicketResponse[]
  requestId: string
}

export interface TicketsRepository {
  findTickets: (
    params: RequestQueryParams,
  ) => Promise<TicketsRepositoryResponse>
  findTicketsUsingRequestId: (
    requestId: string,
  ) => Promise<TicketsRepositoryResponse>
}
