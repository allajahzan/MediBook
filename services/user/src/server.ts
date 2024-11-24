import app from "./app/app";
import dotenv from 'dotenv'
import { MongoDBConnection } from '@mb-medibook/common'
import { envChecker } from "./config/env.checker";

// dotenv config
dotenv.config()

const startServer = async () => {
    try {
        // env checker
        envChecker()

        // mongodb connecion
        const res = await MongoDBConnection(process.env.MONGO_URL as string)
        console.log(res);

        // listen port
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })

    } catch (err: any) {
        console.log(err.message);
    }
}

startServer()