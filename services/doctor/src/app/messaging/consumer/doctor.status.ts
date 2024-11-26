import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import Doctor from "../../schema/doctor";
import { Exchanges, Queues } from "@mb-medibook/common";

export class DoctorStatusConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "fanout", {
                durable: true,
            });

            rabbitmq.channel.assertQueue(Queues.DOCTOR_STATUS_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.DOCTOR_STATUS_QUEUE,
                Exchanges.STATUS_EXCHANGE,
                ""
            );

            rabbitmq.channel.consume(
                Queues.DOCTOR_STATUS_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const { userId, isBlock } = JSON.parse(data.content as any);

                        const doctor = await Doctor.findOne({ userId: userId });
                        if (!doctor) throw new Error("No user found");

                        doctor.isBlock = isBlock;
                        await doctor.save();

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
