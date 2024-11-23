import app from "./app/app";
import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'

// dotenv config
dotenv.config()

// http server
const httpServer = express()

// listen port
httpServer.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})

