import { Exchanges, RoutingKey } from "@mb-medibook/common";
import { rabbitmq } from "../../../config/rabbitmq";

export class UserCreatedProducer {
    private user: any = null;

    constructor(user: any) {
        this.user = user;
    }

    publish() {
        try {
            if (!this.user) throw new Error("No user");

            const routingKey =
                this.user.role === "client"
                    ? RoutingKey.CLIENT_SIGNUP
                    : RoutingKey.DOCTOR_SIGNUP;

            rabbitmq.channel.assertExchange(Exchanges.SIGNUP_EXCHANGE, "direct", {
                durable: true,
            });

            rabbitmq.channel.publish(
                Exchanges.SIGNUP_EXCHANGE,
                routingKey,
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
