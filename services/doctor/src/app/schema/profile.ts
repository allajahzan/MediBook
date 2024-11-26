import { model, Schema } from "mongoose";

export interface ProfileType {
    userId: Schema.Types.ObjectId;
    hospital: string;
    place: string;
    specialization: string;
    dates: string[];
    time: string;
    status: string | null;
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
            required: false,
        },
        dates: {
            type: [String],
            required: false,
        },
        time: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Profile = model<ProfileType>("Profile", profileSchema);
export default Profile;
