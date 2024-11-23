import { Request, Response } from "express";
import { CustomError } from "../errors/error.cutsom";

export const errorHandler = async (error: ErrorCallback, req: Request, res: Response): Promise<any> => {
    try {
        if (error instanceof CustomError) {
            return res.status(error.StatusCode).json(error.serializeError)
        } else {
            return res.status(501).json({ message: 'Unknow error! something went wrong' })
        }
    } catch (err) {
        console.log(err)
    }
}