import { Exchanges } from "@mb-medibook/common";
import { rabbitmq } from "../../../config/rabbitmq";

export class UserStatusProducer {
    private userId: any = null;

    constructor(user: any) {
        this.userId = user._id;
    }

    publish() {
        try {
            if (!this.userId) throw new Error("No user");

            rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "fanout", {
                durable: true,
            });

            rabbitmq.channel.publish(
                Exchanges.STATUS_EXCHANGE,
                "",
                Buffer.from(JSON.stringify({ userId: this.userId }))
            );
            console.log("send message to exchange");
        } catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
}
