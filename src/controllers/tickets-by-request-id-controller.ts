import { Request, Response } from 'express'
import { ElasticsearchTicketsRepository } from '../repositories/elasticsearch/elasticsearch-tickets-repository'
import { GetTicketsUsingRequestId } from '../use-cases/get-tickets-using-request-id'

export class TicketsByRequestIdController {
  public async show(request: Request, response: Response) {
    const { requestId } = request.params

    try {
      if (!requestId) {
        throw new Error('Invalid request params')
      }

      const ticketsRepository = new ElasticsearchTicketsRepository()
      const getTicketsUsingRequestId = new GetTicketsUsingRequestId(
        ticketsRepository,
      )

      const result = await getTicketsUsingRequestId.execute({ requestId })

      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error,
      })
    }
  }
}
