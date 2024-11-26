import { RabbitMQConnection } from "@mb-medibook/common";
import amqp from "amqplib";

class RabbitMQ {
    SIGNUP_EXCHANGE = "user-signup-exchange";

    private _channel: amqp.Channel | null = null;

    constructor() { }

    // get channel
    get channel(): amqp.Channel {
        if (!this._channel)
            throw new Error("cannot access rabbitmq before connection");
        return this._channel;
    }

    // connect to rabbitmq
    async connect(): Promise<void> {
        try {
            this._channel = await RabbitMQConnection("amqp://localhost:5672");

            this._channel.on("close", () => {
                console.log("Rabbitmq connection closed, reconnecting...");
                this._channel = null;
                this.connect();
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export const rabbitmq = new RabbitMQ();
