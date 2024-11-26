import { Request, Response, NextFunction } from "express";

// add profile
export const addProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { name, hospital, place, specializaion, dates, time } = req.body;
        const userPayload = req.headers["x-user-payload"];
        const payload = JSON.parse(userPayload as string);
        const { userId, role } = payload;

        


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
