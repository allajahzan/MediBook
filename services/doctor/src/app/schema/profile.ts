import { model, Schema } from "mongoose";

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
            ref: "Doctor",
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
            required: true,
        },
        dates: {
            type: [String],
            required: true,
        },
        timeFrom: {
            type: Date,
            required: true,
        },
        timeTo: {
            type: Date,
            required: true,
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
