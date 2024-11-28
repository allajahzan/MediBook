import { Router } from "express";
import { authRoute } from "./auth";
import { doctorRoute } from "./doctor";
import { checkAuth } from "../middleware/checkAuth";
import { VerifyAccessToken } from "@mb-medibook/common";

const router = Router();

// user route
router.use("/auth", authRoute);

// doctor route
router.use(
    "/doctor",
    VerifyAccessToken(process.env.ACCESS_TOKEN_SECRET as string),
    checkAuth,
    doctorRoute
);

export { router as appRouter };
