import { Schema, model } from "mongoose";

interface appointmentType {
    doctorId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    date: Date;
}

const appointmentSchema = new Schema<appointmentType>({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const Appointment = model("Appointment", appointmentSchema);
export default Appointment;
