import express from 'express'
import dotenv from 'dotenv'

// create an app
const app = express()

// dotenv config
dotenv.config()

// middlewares
app.use('/', (req,res)=>{
    res.send("server is ok")
})

app.listen(process.env.PORT, ()=>{
    console.log(`auth server is running on port ${process.env.PORT}`)
})