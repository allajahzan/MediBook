import { Router } from "express";
import { authRoute } from "./auth";

const router = Router()

// user route
router.use('/', authRoute)

export {router as appRouter}