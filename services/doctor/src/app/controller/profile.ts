import { Request, Response, NextFunction } from "express";
import Profile from "../schema/profile";
import { DoctorProfileCreatedProducer } from "../messaging/producer/docProfile.created";

// add profile
export const addProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { hospital, place, specialization, dates, time } = req.body;
        const userPayload = req.headers["x-user-payload"];
        const payload = JSON.parse(userPayload as string);
        const { _id, role } = payload;

        const profile = new Profile({userId:_id,hospital,place,specialization,dates,time})
        await profile.save()

        // send message to exchange
        new DoctorProfileCreatedProducer(profile).publish()

    } catch (err) {
        next(err);
    }
};

// edit profile
export const editProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
    } catch (err) {
        next(err);
    }
};
