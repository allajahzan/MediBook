import { Request, Response, NextFunction } from "express";
import Appointment from "../schema/appointment";

// take appointment
export const takeAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
    } catch (err) {
        next(err);
    }
};
