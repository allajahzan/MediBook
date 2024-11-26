import { model, Schema } from "mongoose";

export enum DoctorStatus {
    APPROVED = "approved",
    REJECTED = "rejected",
}

export interface UserType {
    name: string;
    email: string;
    role: string;
    isBlock: boolean;
    status: string | null;
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
        },
        status: {
            type: String,
            required : false
        },
    },
    { timestamps: true }
);

const User = model<UserType>("User", userSchema);
export default User;
