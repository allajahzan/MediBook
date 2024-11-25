import {
    ConflictError,
    HttpStatusCode,
    NotFoundError,
    ResponseMessage,
    SendResponse,
} from "@mb-medibook/common";
import User, { doctorStatus } from "../schema/user";
import { NextFunction, Request, Response } from "express";

// get clients
export const getClients = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const clients = await User.find({ role: "clients" });
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

// block and unblock users
export const blockAndUnblock = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) throw new NotFoundError();

        user.isBlock ? (user.isBlock = false) : (user.isBlock = true);
        const updatedUser = await user.save();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, updatedUser);
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
        const docId = req.params.docId;

        const doctor = await User.findById(docId);
        if (!doctor) throw new NotFoundError();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, doctor);
    } catch (err) {
        next(err);
    }
};

// approve and reject doctor
export const approveAndRejectDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const docId = req.params.docId;
        const status: string = req.body.status;

        if (
            !Object.values(doctorStatus).includes(
                status?.toLowerCase() as doctorStatus
            )
        ) {
            return SendResponse(
                res,
                HttpStatusCode.NOT_FOUND,
                ResponseMessage.NOT_FOUND,
                null
            );
        }

        const doctor = await User.findById(docId);
        if (!doctor) throw new NotFoundError();

        doctor.status = status.toLowerCase() as doctorStatus;
        await doctor.save();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, null);
    } catch (err) {
        next(err);
    }
};
