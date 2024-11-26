import amqp from "amqplib";
import { rabbitmq } from "../../../config/rabbitmq";
import User from "../../schema/doctor";

export class DoctorCreatedConsumer {
    private _queue: string = "DOCTOR_SIGNUP_QUEUE";
    private _channel: amqp.Channel = rabbitmq.channel;

    constructor(channel: amqp.Channel) {
        this._channel = channel;
    }

    consume() {
        try {
            this._channel.assertExchange(rabbitmq.SIGNUP_EXCHANGE, "direct", {
                durable: true,
            });
            this._channel.assertQueue(this._queue, { durable: true });

            this._channel.bindQueue(
                this._queue,
                rabbitmq.SIGNUP_EXCHANGE,
                "doctor.signup"
            );

            this._channel.consume(
                this._queue,
                async (data: amqp.ConsumeMessage | null) => {
                    try {
                        if (!data) throw new Error("recieved null message");

                        const user = JSON.parse(data?.content as any);

                        const newUser = new User({
                            name: user.name,
                            email: user.email,
                            isBlock: user.isBlock,
                            role: user.role,
                            userId: user._id,
                            status: "pending",
                        });
                        await newUser.save();

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
