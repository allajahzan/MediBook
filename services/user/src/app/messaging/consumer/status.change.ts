import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import User from "../../schema/user";
import { Exchanges, Queues, RoutingKey } from "@mb-medibook/common";
import Profile from "../../schema/profile";

export class UserStatusConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "direct", {
                durable: true,
            });

            rabbitmq.channel.assertQueue(Queues.CLIENT_STATUS_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.CLIENT_STATUS_QUEUE,
                Exchanges.STATUS_EXCHANGE,
                RoutingKey.USER_STATUS
            );

            rabbitmq.channel.bindQueue(
                Queues.CLIENT_STATUS_QUEUE,
                Exchanges.STATUS_EXCHANGE,
                RoutingKey.PROFILE_STATUS
            );

            rabbitmq.channel.consume(
                Queues.CLIENT_STATUS_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const key = data.fields.routingKey;
                        const message = JSON.parse(data.content as any);

                        if (key === RoutingKey.USER_STATUS) {

                            const user = await User.findById(message._id);
                            if (!user) throw new Error("No user found");

                            user.isBlock = message.isBlock;
                            await user.save();
                        } else if (key === RoutingKey.PROFILE_STATUS) {

                            const profile = await Profile.findById(message._id);
                            if (!profile) throw new Error("No profile found");

                            profile.status = message.status;
                            await profile.save();
                        }

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
