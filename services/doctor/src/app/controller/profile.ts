import { Request, Response, NextFunction } from "express";
import Profile from "../schema/profile";

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
