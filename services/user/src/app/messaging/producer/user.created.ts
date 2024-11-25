import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";

export class UserCreatedProducer {
    private _exchange: string = "user.created";
    private _channel: amqp.Channel = rabbitmq.channel;
    private data: any;

    constructor(channel: amqp.Channel, data: any) {
        this._channel = channel;
        this.data = data;
    }

    publish() {
        try {
            this._channel.assertExchange(this._exchange, "fanout", { durable: true });
            this._channel.publish(
                this._exchange,
                "",
                Buffer.from(JSON.stringify(this.data))
            );
            console.log("send message to exchange");
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
