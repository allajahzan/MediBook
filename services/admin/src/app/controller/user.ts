import {
    ConflictError,
    HttpStatusCode,
    NotFoundError,
    ResponseMessage,
    SendResponse,
} from "@mb-medibook/common";
import User, { DoctorStatus } from "../schema/user";
import { NextFunction, Request, Response } from "express";
import { UserStatusProducer } from "../messaging/producer/user.status";

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
        const userId = req.params.id;

        const doctor = await User.findOne({userId});
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
        const userId = req.params.id;

        const user = await User.findOne({userId});
        if (!user) throw new NotFoundError();

        user.isBlock ? (user.isBlock = false) : (user.isBlock = true);
        const updatedUser = await user.save();

        // send message to exchange
        new UserStatusProducer(user).publish()

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
        const userId = req.params.id;

        const doctor = await User.findOne({userId});
        if (!doctor) throw new NotFoundError();

        doctor.status = DoctorStatus.APPROVED;
        await doctor.save();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, doctor);
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
        const userId = req.params.id;

        const doctor = await User.findOne({userId});
        if (!doctor) throw new NotFoundError();

        doctor.status = DoctorStatus.REJECTED;
        await doctor.save();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, doctor);
    } catch (err) {
        next(err);
    }
};
