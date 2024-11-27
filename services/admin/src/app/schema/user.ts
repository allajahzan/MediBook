import { model, Schema } from "mongoose";

export interface UserType {
    name: string;
    email: string;
    role: string;
    isBlock: boolean;
}

const userSchema = new Schema<UserType>(
    {
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
        isBlock: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

const User = model<UserType>("User", userSchema);
export default User;
