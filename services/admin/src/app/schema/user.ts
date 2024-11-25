import { model, Schema } from "mongoose";

export enum doctorStatus {
    APPROVED = "approved",
    REJECTED = "rejected",
}

interface userType {
    userId: string;
    name: string;
    email: string;
    role: string;
    isBlock: boolean;
    status?: string;
}

const userSchema = new Schema<userType>(
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
        isBlock: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
            validate: {
                validator: function (value: string | undefined) {
                    return this.role === "doctor" ? !!value : !value;
                },
                message: () => {
                    console.log("status is only allowed for users with role doctor");
                },
            },
        },
    },
    { timestamps: true }
);

const User = model<userType>("User", userSchema);
export default User;
