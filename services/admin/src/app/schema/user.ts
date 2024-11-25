import { model, Schema } from "mongoose";

interface userType {
    userId: string;
    name: string;
    email: string;
    role: string;
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
    },
    { timestamps: true }
);

const User = model<userType>("User", userSchema);
export default User;
