import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import { Exchanges, Queues, RoutingKey } from "@mb-medibook/common";
import Profile from "../../schema/profile";

export class DoctorProfileCreatedConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(Exchanges.PROFILE_EXCHANGE, "direct", {
                durable: true,
            });
            rabbitmq.channel.assertQueue(Queues.ADMIN_DOCTOR_PROFILE_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.ADMIN_DOCTOR_PROFILE_QUEUE,
                Exchanges.PROFILE_EXCHANGE,
                RoutingKey.DOCTOR_PROFILE_CREATE
            );

            rabbitmq.channel.consume(
                Queues.ADMIN_DOCTOR_PROFILE_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const profile = JSON.parse(data.content as any);

                        const newUser = new Profile({ ...profile });
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
