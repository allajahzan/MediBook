import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import User from "../../schema/user";
import { Exchanges, Queues, RoutingKey } from "@mb-medibook/common";

export class UserCreatedConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(Exchanges.SIGNUP_EXCHANGE, "direct", {
                durable: true,
            });
            rabbitmq.channel.assertQueue(Queues.ADMIN_SIGNUP_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.ADMIN_SIGNUP_QUEUE,
                Exchanges.SIGNUP_EXCHANGE,
                RoutingKey.CLIENT_SIGNUP
            );
            rabbitmq.channel.bindQueue(
                Queues.ADMIN_SIGNUP_QUEUE,
                Exchanges.SIGNUP_EXCHANGE,
                RoutingKey.DOCTOR_SIGNUP
            );

            rabbitmq.channel.consume(
                Queues.ADMIN_SIGNUP_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const user = JSON.parse(data.content as any);

                        const newUser = new User({
                            _id : user._id,
                            name: user.name,
                            email: user.email,
                            isBlock: user.isBlock,
                            role: user.role,
                            status: user.role === "client" ? null : "pending",
                        });
                        await newUser.save();

                        rabbitmq.channel.ack(data as amqp.ConsumeMessage);
                        console.log("data stored to db");
                    } catch (err) {
                        rabbitmq.channel.nack(data as amqp.ConsumeMessage, false, true);
                        console.log(err);
                    }
                }
            );
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
