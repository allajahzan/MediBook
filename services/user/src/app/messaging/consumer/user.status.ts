import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import User from "../../schema/user";
import { Exchanges, Queues } from "@mb-medibook/common";

export class UserStatusConsumer {
    consume() {
        try {
            rabbitmq.channel.deleteExchange(Exchanges.STATUS_EXCHANGE)
            rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "fanout", {
                durable: true,
            });

            rabbitmq.channel.assertQueue(Queues.CLIENT_STATUS_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.CLIENT_STATUS_QUEUE,
                Exchanges.STATUS_EXCHANGE,
                ""
            );

            rabbitmq.channel.consume(
                Queues.CLIENT_STATUS_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const { _id, isBlock } = JSON.parse(data.content as any);

                        const user = await User.findById(_id);
                        if (!user) throw new Error("No user found");

                        user.isBlock = isBlock;
                        await user.save();

                        rabbitmq.channel.ack(data);
                        console.log("data saved to db");
                    } catch (err) {
                        rabbitmq.channel.nack(data as amqp.ConsumeMessage, false, true);
                        console.log(err);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }
}
