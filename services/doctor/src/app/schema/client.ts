import { model, Schema } from "mongoose";

export interface ClientType {
    userId: string;
    name: string;
    email: string;
    role: string;
}

const clientSchema = new Schema<ClientType>(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Client = model<ClientType>("Client", clientSchema);
export default Client;
