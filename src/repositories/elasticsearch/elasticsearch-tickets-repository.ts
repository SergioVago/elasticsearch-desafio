import {
  QueryDslBoolQuery,
  QueryDslQueryContainer,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types'
import { getClient } from '../../client/elasticsearch'
import { Ticket, TicketProps } from '../../entities/ticket'
import { RequestQueryParams } from '../../middlewares/middleware-validate-request-query'
import {
  TicketsRepository,
  TicketsRepositoryResponse,
} from '../tickets-repository'

export class ElasticsearchTicketsRepository implements TicketsRepository {
  private generateMustFilterWithOptionalParams(
    params: RequestQueryParams,
  ): QueryDslQueryContainer[] {
    const { inboundDate, cabinClass } = params

    const mustFilterWithOptionalParams = []

    if (cabinClass) {
      mustFilterWithOptionalParams.push({
        term: {
          'cabinClass.keyword': cabinClass,
        },
      })
    }

    if (inboundDate) {
      mustFilterWithOptionalParams.push({
        range: {
          arrivalTime: { gte: inboundDate },
        },
      })
    }

    return mustFilterWithOptionalParams
  }

  private generateResponse(result: SearchResponse<TicketProps>) {
    if (!result._scroll_id) {
      throw new Error('should have a scroll id')
    }

    if (!result.hits.hits) {
      throw new Error('should have a ticket array')
    }

    const tickets = result.hits.hits.map((hit) => {
      if (!hit._source) {
        throw new Error('Ticket hit should have source props')
      }

      const ticket = new Ticket(hit._source, hit._id)

      return ticket.getParsedTicket()
    })

    return {
      tickets,
      requestId: result._scroll_id,
    }
  }

  public async findTickets(
    params: RequestQueryParams,
  ): Promise<TicketsRepositoryResponse> {
    const { adults, children, destinationPlace, originPlace, outboundDate } =
      params

    const minimumSeats = Number(adults) + Number(children || 0)

    const mustFilter = [
      {
        term: {
          'departureStation.keyword': originPlace,
        },
      },
      {
        term: {
          'arrivalStation.keyword': destinationPlace,
        },
      },
      {
        range: {
          remainingSeats: { gte: minimumSeats },
        },
      },
      {
        range: {
          departureTime: { gte: outboundDate },
        },
      },
    ]

    const extraMustFilter = this.generateMustFilterWithOptionalParams(params)

    const boolQuery: QueryDslBoolQuery | any = {
      must: [...mustFilter, ...extraMustFilter],
    }

    const query: QueryDslQueryContainer = {
      constant_score: {
        filter: {
          bool: boolQuery,
        },
      },
    }

    const result = await getClient().search<TicketProps>({
      index: 'tickets',
      size: 20,
      scroll: '30s',
      query,
    })

    const response = this.generateResponse(result)

    return response
  }

  public async findTicketsUsingRequestId(
    requestId: string,
  ): Promise<TicketsRepositoryResponse> {
    const result = await getClient().scroll<Ticket>({
      scroll_id: requestId,
      scroll: '30s',
    })

    const response = this.generateResponse(result)

    return response
  }
}
