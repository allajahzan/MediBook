import { Request, Response, NextFunction } from "express";

// get clients
export const getClients = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
    } catch (err) {
        next(err);
    }
};
