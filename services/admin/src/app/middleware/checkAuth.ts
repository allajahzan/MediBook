import { Request, Response, NextFunction } from "express";
import { NotFoundError, Unauthorized } from "@mb-medibook/common";
import User from "../schema/user";

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const userPayload = req.headers["x-user-payload"];
        if (!userPayload) {
            throw new Unauthorized("No payload");
        }

        const payload = JSON.parse(userPayload as string);
        const { _id, role } = payload;

        const user = await User.findOne({ _id, role : 'admin' });
        if (!user) throw new Unauthorized('Unauthorized access')

        if (user.isBlock)
            throw new Unauthorized("Your account has been blocked by admin");

        next();
    } catch (err) {
        next(err);
    }
};
