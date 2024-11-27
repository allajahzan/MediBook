import { model, Schema } from "mongoose";

export enum DoctorStatus {
    APPROVED = "approved",
    REJECTED = "rejected",
}

export interface ProfileType {
    userId: Schema.Types.ObjectId;
    hospital: string;
    place: string;
    specialization: string;
    dates: string[];
    timeFrom: Date;
    timeTo: Date;
    status: string;
}

const profileSchema = new Schema<ProfileType>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        hospital: {
            type: String,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: false,
        },
        dates: {
            type: [String],
            required: false,
        },
        timeFrom: {
            type: Date,
            required: false,
        },
        timeTo: {
            type: Date,
            required: false,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);

const Profile = model<ProfileType>("Profile", profileSchema);
export default Profile;
