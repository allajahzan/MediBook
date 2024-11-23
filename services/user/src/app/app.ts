import express from 'express'
import { appRouter } from '../app/router/index'
import morgan from 'morgan'

// create an app
const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', appRouter)
app.all('*', () => {
    throw new Error("asdf")
})

export default app