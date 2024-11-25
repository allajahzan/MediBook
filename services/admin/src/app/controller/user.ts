import {
    ConflictError,
    HttpStatusCode,
    NotFoundError,
    ResponseMessage,
    SendResponse,
} from "@mb-medibook/common";
import User, { DoctorStatus } from "../schema/user";
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

// get doctor
export const getDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const docId = req.params.id;

        const doctor = await User.findById(docId);
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

        const user = await User.findById(userId);
        if (!user) throw new NotFoundError();

        user.isBlock ? (user.isBlock = false) : (user.isBlock = true);
        const updatedUser = await user.save();

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
        const docId = req.params.id;

        const doctor = await User.findById(docId);
        if (!doctor) throw new NotFoundError();

        doctor.status = DoctorStatus.REJECTED;
        await doctor.save();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, null);
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
        const docId = req.params.id;

        const doctor = await User.findById(docId);
        if (!doctor) throw new NotFoundError();

        doctor.status = DoctorStatus.REJECTED;
        await doctor.save();

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, null);
    } catch (err) {
        next(err);
    }
};
