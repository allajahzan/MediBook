import { Request, Response, NextFunction } from "express";
import {
    HttpStatusCode,
    ResponseMessage,
    SendResponse,
} from "@mb-medibook/common";
import Profile from "../schema/profile";

// get doctors profile
export const getDocProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const profiles = await Profile.find({status : "approved"});
        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, profiles);
    } catch (err) {
        next(err);
    }
};
