import { Router } from "express";
import { appointmentRouter } from "../router/appointment";
const router = Router();

// take appointment
router.use("/doctor", appointmentRouter);

export { router as appRouter };
