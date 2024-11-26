import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import User from "../../schema/doctor";

export class DoctorCreatedConsumer {
    private _queue: string = "DOCTOR.CREATED";
    private _exchange: string = "user.created";
    private _channel: amqp.Channel = rabbitmq.channel;

    constructor(channel: amqp.Channel) {
        this._channel = channel;
    }

    consume() {
        try {
            this._channel.assertExchange(this._exchange, "fanout", { durable: true });
            this._channel.assertQueue(this._queue, { durable: true });

            this._channel.bindQueue(this._queue, this._exchange, "");

            this._channel.consume(
                this._queue,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const user = JSON.parse(data?.content as any);

                        if (user.role === "doctor") {
                            const newUser = new User({
                                name: user.name,
                                email: user.email,
                                isBlock: user.isBlock,
                                role: user.role,
                                userId: user._id,
                                status: "pending",
                            });
                            await newUser.save();
                        }

                        this._channel.ack(data as amqp.ConsumeMessage);
                        console.log("data stored to db");
                    } catch (err) {
                        this._channel.nack(data as amqp.ConsumeMessage, false, true);
                        console.log(err);
                    }
                }
            );
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
