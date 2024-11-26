import app from "./app/app";
import dotenv from "dotenv";
import { envChecker } from "./config/env.check";
import { MongoDBConnection } from "@mb-medibook/common";
import { rabbitmq } from "./config/rabbitmq";
import { UserCreatedConsumer } from "./app/messaging/consumer/user.created";
import { DoctorProfileCreatedConsumer } from "./app/messaging/consumer/docProfile.create";

// env config
dotenv.config();

const startServer = async (): Promise<void> => {
    try {
        // env checker
        envChecker();

        // rabbitmq connection
        await rabbitmq.connect();
        new UserCreatedConsumer().consume()
        new DoctorProfileCreatedConsumer().consume()

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

startServer();
