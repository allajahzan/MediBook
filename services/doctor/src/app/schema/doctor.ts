import { model, Schema } from "mongoose";

export interface DoctorType {
    userId?: string;
    name: string;
    email: string;
    role: string;
    isBlock: boolean;
    status: string | null;
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
        status: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Doctor = model<DoctorType>("Doctor", doctorSchema);
export default Doctor;
