import { Response } from 'express'
import { RequestWithValidQueryParams } from '../middlewares/middleware-validate-request-query'
import { ElasticsearchTicketsRepository } from '../repositories/elasticsearch/elasticsearch-tickets-repository'
import { GetTickets } from '../use-cases/get-tickets'

export class TicketsController {
  public async index(request: RequestWithValidQueryParams, response: Response) {
    const { validatedQueryParams } = request

    try {
      if (!validatedQueryParams) {
        throw new Error('Invalid request params')
      }

      const ticketsRepository = new ElasticsearchTicketsRepository()
      const getTickets = new GetTickets(ticketsRepository)

      const result = await getTickets.execute({
        requestQueryParams: validatedQueryParams,
      })

      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({
        success: false,
        error,
      })
    }
  }
}
