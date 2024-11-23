import express from 'express'
import dotenv from 'dotenv'
import {appRouter} from '../app/router/index'
import morgan from 'morgan'

// create an app
const app = express()

// dotenv config
dotenv.config()

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api', appRouter)
app.all('*', ()=>{
    throw new Error("asdf")
})

export default app