import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";

export class UserCreatedProducer {
    private _channel: amqp.Channel = rabbitmq.channel;
    private user: any = null;

    constructor(user: any) {
        this.user = user;
    }

    publish() {
        try {
            if (!this.user) throw new Error("No user");

            const routingKey =
                this.user.role === "client" ? "client.signup" : "doctor.signup";

            this._channel.assertExchange(rabbitmq.SIGNUP_EXCHANGE, "direct", {
                durable: true,
            });

            this._channel.publish(
                rabbitmq.SIGNUP_EXCHANGE,
                routingKey,
                Buffer.from(JSON.stringify(this.user))
            );
            console.log("send message to exchange");
        } catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
}
