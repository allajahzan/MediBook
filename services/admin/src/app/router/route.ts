import { Router } from "express";
import { userRoute } from "./user";

const router = Router()

// user route
router.use('/', userRoute)

export {router as appRouter}