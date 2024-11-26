import { model, Schema } from "mongoose";

interface userType {
    name: string;
    email: string;
    password: string;
    role: string;
    isBlock : boolean,
}

const userSchema = new Schema<userType>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        isBlock : {
            type: Boolean,
            default : false
        }
    },
    { timestamps: true }
);

const User = model<userType>("User", userSchema);
export default User;
