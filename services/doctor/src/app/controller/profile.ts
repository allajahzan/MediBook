import { Request, Response, NextFunction } from "express";
import Profile from "../schema/profile";
import { DoctorProfileCreatedProducer } from "../messaging/producer/docProfile.created";
import {
    ConflictError,
    HttpStatusCode,
    ResponseMessage,
    SendResponse,
    Unauthorized,
} from "@mb-medibook/common";
import { DoctorProfileUpdatedProducer } from "../messaging/producer/docProfile.updated";

// add profile
export const addProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { hospital, place, specialization, dates, timeFrom, timeTo } =
            req.body;
        const userPayload = req.headers["x-user-payload"];
        const payload = JSON.parse(userPayload as string);
        const { _id, role } = payload;

        const isProfile = await Profile.findOne({ userId: _id });
        if (isProfile) throw new ConflictError("This profile already exists");

        const profile = new Profile({
            userId: _id,
            hospital,
            place,
            specialization,
            dates,
            timeFrom,
            timeTo,
        });
        await profile.save();

        // send message to exchange
        new DoctorProfileCreatedProducer(profile).publish();

        SendResponse(res, HttpStatusCode.CREATED, ResponseMessage.CREATED, profile);
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
        const { hospital, place, specialization, dates, timeFrom, timeTo } =
            req.body;
        const userPayload = req.headers["x-user-payload"];
        const payload = JSON.parse(userPayload as string);
        const { _id, role } = payload;

        const profile = await Profile.findOne({ userId: _id });
        if (!profile) throw new Unauthorized("This profile doesn\t exists");

        profile.hospital = hospital;
        profile.place = place;
        profile.specialization = specialization;
        profile.dates = dates;
        profile.timeFrom = timeFrom;
        profile.timeTo = timeTo;

        await profile.save();

        // send message to exchange
        new DoctorProfileUpdatedProducer(profile).publish();

        SendResponse(res, HttpStatusCode.CREATED, ResponseMessage.CREATED, profile);
    } catch (err) {
        next(err);
    }
};
