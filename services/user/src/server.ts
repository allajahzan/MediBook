// dotenv config
import dotenv from "dotenv";
dotenv.config();

import app from "./app/app";
import { MongoDBConnection } from "@mb-medibook/common";
import { envChecker } from "./config/env.check";
import { rabbitmq } from "./config/rabbitmq";


const startServer = async (): Promise<void> => {
    try {
        // env checker
        envChecker();

        // rabbimq connection
        await rabbitmq.connect();

        // mongodb connecion
        await MongoDBConnection(process.env.MONGO_URL as string);

        // listen port
        app.listen(process.env.PORT, () => {
            console.log(`user server is running on port ${process.env.PORT}`);
        });
    } catch (err: any) {
        console.log(err.message);
    }
};

startServer();
