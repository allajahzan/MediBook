import User from "../schema/auth";
import { NextFunction, Request, Response } from "express";
import {
    ConflictError,
    GenerateJwtAccessToken,
    HashedPassword,
    HttpStatusCode,
    JWTPayloadType,
    NotFoundError,
    ResponseMessage,
    SendResponse,
    VerifyPassword,
} from "@mb-medibook/common";

// user login
export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new NotFoundError();

        const verifyPassword = VerifyPassword(password, user.password);
        if (!verifyPassword)
            return SendResponse(
                res,
                HttpStatusCode.UNAUTHORIZED,
                ResponseMessage.UNAUTHORIZED,
                null
            );

        const payload: JWTPayloadType = {
            userid: user._id.toString(),
            role: user.role,
        };

        const token = GenerateJwtAccessToken(
            payload,
            process.env.ACCESS_TOKEN_SECRET as string,
            "1m"
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            path: "/",
        });

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, token);
    } catch (err) {
        next(err);
    }
};

// client signup
export const clientSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        const isUser = await User.findOne({ email });
        if (isUser) throw new ConflictError("This email already exists");

        // hash password
        const hashedPassword = await HashedPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "doctor",
        });
        await newUser.save();

        SendResponse(res, HttpStatusCode.CREATED, ResponseMessage.CREATED, newUser);
    } catch (err) {
        next(err);
    }
};

// doctor singup
export const doctorSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password } = req.body;

        const isUser = await User.findOne({ email });
        if (isUser) throw new ConflictError("This email already exists");

        // hash password
        const hashedPassword = await HashedPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "client",
        });
        await newUser.save();

        SendResponse(res, HttpStatusCode.CREATED, ResponseMessage.CREATED, newUser);
    } catch (err) {
        next(err);
    }
};
