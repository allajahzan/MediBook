import {
    HttpStatusCode,
    NotFoundError,
    ResponseMessage,
    SendResponse,
} from "@mb-medibook/common";
import User from "../schema/user";
import { NextFunction, Request, Response } from "express";
import { UserStatusProducer } from "../messaging/producer/user.status";
import Profile from "../schema/profile";
import { ProfileStatusProducer } from "../messaging/producer/profile.status";

// get clients
export const getClients = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const clients = await User.find({ role: "client" });
        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, clients);
    } catch (err) {
        next(err);
    }
};

// get doctors
export const getDoctors = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const doctors = await User.find({ role: "doctor" });
        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, doctors);
    } catch (err) {
        next(err);
    }
};

// get doctor
export const getDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const _id = req.params.id;

        const doctor = await User.findById(_id);
        if (!doctor) throw new NotFoundError();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, doctor);
    } catch (err) {
        next(err);
    }
};

// block and unblock users
export const blockAndUnblock = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const _id = req.params.id;

        const user = await User.findById(_id);
        if (!user) throw new NotFoundError();

        user.isBlock ? (user.isBlock = false) : (user.isBlock = true);
        const updatedUser = await user.save();

        // send message to exchange
        new UserStatusProducer(user).publish();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, updatedUser);
    } catch (err) {
        next(err);
    }
};

// approve doctor
export const approveDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const _id = req.params.id;

        const profile = await Profile.findOne({ userId: _id });
        if (!profile) throw new NotFoundError();

        profile.status = "approved";
        await profile.save();

        // send message to exchange
        new ProfileStatusProducer(profile).publish();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, profile);
    } catch (err) {
        next(err);
    }
};

// reject doctor
export const rejectDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const _id = req.params.id;

        const profile = await Profile.findOne({ userId: _id });
        if (!profile) throw new NotFoundError();

        profile.status = "rejected";
        await profile.save();

        // send message to exchange
        new ProfileStatusProducer(profile).publish();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, profile);
    } catch (err) {
        next(err);
    }
};
