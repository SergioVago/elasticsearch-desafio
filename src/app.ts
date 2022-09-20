import express from 'express'
import * as dotenv from 'dotenv'

import { router } from './routes'

// import { generateTicketData } from './sample/tickets'

dotenv.config()

// if you wants generate sample data on server run
// generateTicketData(true)

const app = express()

app.use(express.json())
app.use(router)

export { app }
