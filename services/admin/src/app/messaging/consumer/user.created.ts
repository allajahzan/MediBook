import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import { Queues } from "../queues";
import { Exchanges } from "../exchanges";
import User from "../../schema/user";
import { RoutingKey } from "../routingKey";

export class UserCreatedConsumer {
    private _channel: amqp.Channel = rabbitmq.channel;

    constructor(channel: amqp.Channel) {
        this._channel = channel;
    }

    async consume() {
        try {
            this._channel.assertExchange(Exchanges.SIGNUP_EXCHANGE, "direct", {
                durable: true,
            });
            this._channel.assertQueue(Queues.ADMIN_SIGNUP_QUEUE, { durable: true });

            this._channel.bindQueue(
                Queues.ADMIN_SIGNUP_QUEUE,
                Exchanges.SIGNUP_EXCHANGE,
                RoutingKey.CLIENT_SIGNUP
            );
            this._channel.bindQueue(
                Queues.ADMIN_SIGNUP_QUEUE,
                Exchanges.SIGNUP_EXCHANGE,
                RoutingKey.DOCTOR_SIGNUP
            );

            this._channel.consume(
                Queues.ADMIN_SIGNUP_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const user = JSON.parse(data?.content as any);

                        const newUser = new User({
                            name: user.name,
                            email: user.email,
                            isBlock: user.isBlock,
                            role: user.role,
                            userId: user._id,
                            status: user.role === "client" ? null : "pending",
                        });
                        await newUser.save();

                        this._channel.ack(data as amqp.ConsumeMessage);
                        console.log("data stored to db");
                    } catch (err) {
                        this._channel.nack(data as amqp.ConsumeMessage, false, true);
                        console.log(err);
                    }
                }
            );
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
