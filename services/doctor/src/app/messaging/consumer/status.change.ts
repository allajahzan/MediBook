import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import Doctor from "../../schema/doctor";
import { Exchanges, Queues, RoutingKey } from "@mb-medibook/common";
import Profile from "../../schema/profile";

export class DoctorStatusConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "direct", {
                durable: true,
            });

            rabbitmq.channel.assertQueue(Queues.DOCTOR_STATUS_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.DOCTOR_STATUS_QUEUE,
                Exchanges.STATUS_EXCHANGE,
                RoutingKey.USER_STATUS
            );

            rabbitmq.channel.bindQueue(
                Queues.DOCTOR_STATUS_QUEUE,
                Exchanges.STATUS_EXCHANGE,
                RoutingKey.PROFILE_STATUS
            );

            rabbitmq.channel.consume(
                Queues.DOCTOR_STATUS_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const key = data.fields.routingKey;
                        const message = JSON.parse(data.content as any);

                        if (key === RoutingKey.USER_STATUS) {

                            const doctor = await Doctor.findById(message._id);
                            if (!doctor) throw new Error("No user found");

                            doctor.isBlock = message.isBlock;
                            await doctor.save();
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
