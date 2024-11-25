import { RabbitMQConnection } from "@mb-medibook/common";
import amqp from "amqplib";

class RabbitMQ {
    private _channel: amqp.Channel | null = null;

    constructor() { }

    // get channel
    get channel() {
        if (!this._channel)
            throw new Error("cannot access rabbitq before connection");
        return this._channel;
    }

    // connect to rabbitmq
    async connect() {
        try {
            this._channel = await RabbitMQConnection("amqp://localhost:5672");

            this._channel.on("close", () => {
                console.log("Rabbitmq connection closed, reconnecting...");
                this._channel = null;
                this.connect();
            });
        } catch (err: any) {
            throw new Error(err)
        }
    }
}

export const rabbitmq = new RabbitMQ();
