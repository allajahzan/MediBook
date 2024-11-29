import { Exchanges, RoutingKey } from "@mb-medibook/common";
import { rabbitmq } from "../../../config/rabbitmq";

export class ProfileStatusProducer {
    private user = null;

    constructor(user: any) {
        this.user = user;
    }

    publish() {
        try {
            if (!this.user) throw new Error("No user");

            rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "direct", {
                durable: true,
            });

            rabbitmq.channel.publish(
                Exchanges.STATUS_EXCHANGE,
                RoutingKey.PROFILE_STATUS,
                Buffer.from(JSON.stringify(this.user)),
                { persistent: true }
            );

            console.log("send message to exchange");
        } catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
}
