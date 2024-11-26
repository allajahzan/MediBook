import { rabbitmq } from "../../../config/rabbitmq";
import { Exchanges, RoutingKey } from "@mb-medibook/common";

export class DoctorProfileCreatedProducer {
    private _profile: any = null;

    constructor(profile: any) {
        this._profile = profile;
    }

    publish() {
        try {
            if (!this._profile) throw new Error("No user");

            rabbitmq.channel.assertExchange(Exchanges.PROFILE_EXCHANGE, "direct", {
                durable: true,
            });

            rabbitmq.channel.publish(
                Exchanges.STATUS_EXCHANGE,
                RoutingKey.DOCTOR_PROFILE_CREATE,
                Buffer.from(JSON.stringify(this._profile)),
                { persistent: true }
            );
            console.log("send message to exchange");
        } catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
}
