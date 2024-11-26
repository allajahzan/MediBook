import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import Doctor from "../../schema/doctor";
import { Queues } from "@mb-medibook/common";

export class DoctorCreatedConsumer {
    consume() {
        try {
            rabbitmq.channel.assertExchange(rabbitmq.SIGNUP_EXCHANGE, "direct", {
                durable: true,
            });
            rabbitmq.channel.assertQueue(Queues.DOCTOR_SIGNUP_QUEUE, {
                durable: true,
            });

            rabbitmq.channel.bindQueue(
                Queues.DOCTOR_SIGNUP_QUEUE,
                rabbitmq.SIGNUP_EXCHANGE,
                "doctor.signup"
            );

            rabbitmq.channel.consume(
                Queues.DOCTOR_SIGNUP_QUEUE,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const doctor = JSON.parse(data?.content as any);

                        const newDoctor = new Doctor({
                            name: doctor.name,
                            email: doctor.email,
                            isBlock: doctor.isBlock,
                            role: doctor.role,
                            userId: doctor._id,
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
