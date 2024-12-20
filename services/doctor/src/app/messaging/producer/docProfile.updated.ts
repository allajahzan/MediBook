import { rabbitmq } from "../../../config/rabbitmq";
import { Exchanges, RoutingKey } from "@mb-medibook/common";

export class DoctorProfileUpdatedProducer {
    private _profile: any = null;

    constructor(profile: any) {
        this._profile = profile;
    }

    publish() {
        try {
            if (!this._profile) throw new Error("No Profile");

            rabbitmq.channel.assertExchange(Exchanges.PROFILE_EXCHANGE, "direct", {
                durable: true,
            });

            rabbitmq.channel.publish(
                Exchanges.PROFILE_EXCHANGE,
                RoutingKey.DOCTOR_PROFILE_UPDATE,
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
