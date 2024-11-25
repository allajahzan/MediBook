import { Request, Response, NextFunction } from "express";

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const {userId, role} = req.body.payload
        console.log(userId, role);
        next()
    } catch (err) {
        next(err);
    }
};
