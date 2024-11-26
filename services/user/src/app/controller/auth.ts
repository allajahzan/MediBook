import User from "../schema/user";
import { NextFunction, Request, Response } from "express";
import {
    ConflictError,
    GenerateJwtToken,
    HashedPassword,
    HttpStatusCode,
    JWTPayloadType,
    ResponseMessage,
    SendResponse,
    Unauthorized,
    VerifyPassword,
} from "@mb-medibook/common";
import { UserCreatedProducer } from "../messaging/producer/user.created";

// user login
export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new Unauthorized('Incorrect Email address');

        if (user.isBlock)
            throw new Unauthorized("Your account has been blocked by admin");

        const verifyPassword = await VerifyPassword(password, user.password);
        if (!verifyPassword) throw new Unauthorized('Incorrect password');

        const payload: JWTPayloadType = {
            _id: user._id.toString(),
            role: user.role,
        };

        const token = GenerateJwtToken(
            payload,
            process.env.ACCESS_TOKEN_SECRET as string,
            "5m"
        );

        SendResponse(res, HttpStatusCode.OK, ResponseMessage.SUCCESS, {
            token,
            user,
        });
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
            role: "client",
        });
        await newUser.save();

        // rabbitmq producer
        new UserCreatedProducer(newUser).publish();

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
            role: "doctor",
        });
        await newUser.save();

        // rabbitmq producer
        new UserCreatedProducer(newUser).publish();

        SendResponse(res, HttpStatusCode.CREATED, ResponseMessage.CREATED, newUser);
    } catch (err) {
        next(err);
    }
};
