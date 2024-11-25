import { Router } from "express";
import { adminRoute } from "./admin";

const router = Router()

// user route
router.use('/admin', adminRoute)

export {router as appRouter}