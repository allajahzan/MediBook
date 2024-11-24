import { verifyAccessToken } from "@mb-medibook/common";
import { Request, Response, NextFunction } from "express";

export const Authorization = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        const payload = verifyAccessToken(
            token as string,
            process.env.ACCESS_TOKEN_SECRET as string
        );
        req.body = payload;
        next();
    } catch (err: any) {
        throw new Error(err.message);
    }
};
