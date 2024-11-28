import app from "./app/app";
import dotenv from "dotenv";
import { envChecker } from "./config/env.checker";
import { rabbitmq } from "./config/rabbitmq";
import { MongoDBConnection } from "@mb-medibook/common";

// env config
dotenv.config();

const startServer = async (): Promise<void> => {
    try {
        // env checker
        envChecker();

        // connect to rabbitmq
        await rabbitmq.connect();

        // mongodb connection
        await MongoDBConnection(process.env.MONGO_URL as string);

        // listen port
        app.listen(process.env.PORT, () => {
            console.log("doctor service is running on port 3002");
        });
    } catch (err: any) {
        console.log(err.message);
    }
};

startServer();
