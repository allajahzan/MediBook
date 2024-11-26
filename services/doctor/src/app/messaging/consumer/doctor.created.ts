import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import Doctor from "../../schema/doctor";
import { Exchanges, Queues } from "@mb-medibook/common";

export class DoctorCreatedConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(Exchanges.SIGNUP_EXCHANGE, "direct", {
                durable: true,
            });
            rabbitmq.channel.assertQueue(Queues.DOCTOR_SIGNUP_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.DOCTOR_SIGNUP_QUEUE,
                Exchanges.SIGNUP_EXCHANGE,
                "doctor.signup"
            );

            rabbitmq.channel.consume(
                Queues.DOCTOR_SIGNUP_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const doctor = JSON.parse(data?.content as any);

                        const newDoctor = new Doctor({
                            _id : doctor.userId,
                            name: doctor.name,
                            email: doctor.email,
                            isBlock: doctor.isBlock,
                            role: doctor.role,
                            status: "pending",
                        });
                        await newDoctor.save();

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
