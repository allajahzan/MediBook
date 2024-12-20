import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import { Exchanges, Queues, RoutingKey } from "@mb-medibook/common";
import Profile from "../../schema/profile";

export class DoctorProfileConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(Exchanges.PROFILE_EXCHANGE, "direct", {
                durable: true,
            });
            rabbitmq.channel.assertQueue(Queues.CLIENT_DOCTOR_PROFILE_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.CLIENT_DOCTOR_PROFILE_QUEUE,
                Exchanges.PROFILE_EXCHANGE,
                RoutingKey.DOCTOR_PROFILE_CREATE
            );

            rabbitmq.channel.bindQueue(
                Queues.CLIENT_DOCTOR_PROFILE_QUEUE,
                Exchanges.PROFILE_EXCHANGE,
                RoutingKey.DOCTOR_PROFILE_UPDATE
            );

            rabbitmq.channel.consume(
                Queues.CLIENT_DOCTOR_PROFILE_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const profile = JSON.parse(data.content as any);

                        const isProfile = await Profile.findById(profile._id);
                        if (!isProfile) {
                            const newUser = new Profile({ ...profile });
                            await newUser.save();
                        } else {
                            isProfile.hospital = profile.hospital;
                            isProfile.place = profile.place;
                            isProfile.specialization = profile.specialization;
                            isProfile.dates = profile.dates;
                            isProfile.timeFrom = profile.timeFrom;
                            isProfile.timeTo = profile.timeTo;
                            isProfile.status = profile.status;
                            await isProfile.save();
                        }

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
