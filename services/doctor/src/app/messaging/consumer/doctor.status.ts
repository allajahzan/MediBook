import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import User from "../../schema/doctor";
import { Exchanges, Queues } from "@mb-medibook/common";

export class DoctorStatusConsumer {
    consume() {
        rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "fanout", {
            durable: true,
        });

        rabbitmq.channel.assertQueue(Queues.DOCTOR_STATUS_QUEUE, { durable: true });

        rabbitmq.channel.bindQueue(
            Queues.DOCTOR_STATUS_QUEUE,
            Exchanges.STATUS_EXCHANGE,
            ""
        );

        rabbitmq.channel.consume(
            Queues.DOCTOR_STATUS_QUEUE,
            async (data: amqp.ConsumeMessage | null) => {
                if (!data) throw new Error("recieved null message");

                const user = JSON.parse(data.content as any);

                console.log(user);
            }
        );
    }
}
