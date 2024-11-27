import { model, Schema } from "mongoose";

export interface DoctorType {
    userId?: string;
    name: string;
    email: string;
    role: string;
    isBlock: boolean;
}

const doctorSchema = new Schema<DoctorType>(
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
    },
    { timestamps: true }
);

const Doctor = model<DoctorType>("Doctor", doctorSchema);
export default Doctor;
