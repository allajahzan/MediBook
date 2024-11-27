import app from "./app/app";
import dotenv from "dotenv";
import { MongoDBConnection } from "@mb-medibook/common";
import { envChecker } from "./config/env.check";
import { rabbitmq } from "./config/rabbitmq";
import { UserStatusConsumer } from "./app/messaging/consumer/user.status";
import { DoctorProfileConsumer } from "./app/messaging/consumer/docProfile.consumer";


// dotenv config
dotenv.config();

const startServer = async (): Promise<void> => {
    try {
        // env checker
        envChecker();

        // rabbimq connection
        await rabbitmq.connect();
        new UserStatusConsumer().consume();
        new DoctorProfileConsumer().consume();

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
