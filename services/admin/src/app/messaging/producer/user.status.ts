import { Exchanges } from "@mb-medibook/common";
import { rabbitmq } from "../../../config/rabbitmq";

export class UserStatusProducer {
    private _id: any = null;
    private isBlock: any = null;

    constructor(user: any) {
        this._id = user._id;
        this.isBlock = user.isBlock;
    }

    publish() {
        try {
            if (!this._id) throw new Error("No user");

            rabbitmq.channel.assertExchange(Exchanges.STATUS_EXCHANGE, "fanout", {
                durable: true,
            });

            rabbitmq.channel.publish(
                Exchanges.STATUS_EXCHANGE,
                "",
                Buffer.from(
                    JSON.stringify({ _id: this._id, isBlock: this.isBlock })
                ),
                { persistent: true }
            );
            console.log("send message to exchange");
        } catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
}
