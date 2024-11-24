import express from 'express'
import { appRouter } from '../app/router/index'
import morgan from 'morgan'

// create an app
const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use('/', appRouter)
app.all('*', () => {
    throw new Error('Not found')
})

export default app