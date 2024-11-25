import app from "./app/app";
import dotenv from "dotenv";
import { envChecker } from "./config/env.check";
import { MongoDBConnection } from "@mb-medibook/common";

// env config
dotenv.config();

const startServer = async () => {
    try {
        // env checker
        envChecker();

        // rabbitmq connection
        

        // mongodb connection
        await MongoDBConnection(process.env.MONGO_URL as string);

        // listen port
        app.listen(process.env.PORT, () => {
            console.log(`admin server is running on port ${process.env.PORT}`);
        });
    } catch (err: any) {
        console.log(err.message);
    }
};

startServer()
