import { Router } from "express";
import { takeAppointment } from "../controller/appointment";

const router = Router();

// take appointment
router.post("/appointment", takeAppointment);

export { router as appointmentRouter };
