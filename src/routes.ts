import { Router } from 'express'
import { TicketsByRequestIdController } from './controllers/tickets-by-request-id-controller'
import { TicketsController } from './controllers/tickets-controller'
import { middlewareValidateRequestQuery } from './middlewares/middleware-validate-request-query'

const router = Router()

const ticketsController = new TicketsController()
const ticketsByRequestIdController = new TicketsByRequestIdController()

router.get('/tickets', middlewareValidateRequestQuery, ticketsController.index)
router.get('/tickets/pull/:requestId', ticketsByRequestIdController.show)

export { router }
