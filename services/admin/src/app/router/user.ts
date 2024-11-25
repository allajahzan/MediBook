import { Router } from "express";
import {
    approveDoctor,
    blockAndUnblock,
    getClients,
    getDoctor,
    getDoctors,
    rejectDoctor,
} from "../controller/user";

const router = Router();

// get clients list
router.get("/clients", getClients);

// get doctors lists
router.get("/doctors", getDoctors);

// get doctor
router.get("/doctor/:id", getDoctor);

// block/unblock user
router.patch("/user/:id/status", blockAndUnblock);

// approve doctor
router.post("/doctor/:id/approve", approveDoctor);

// reject doctor
router.post("/doctor/:id/reject", rejectDoctor);

export { router as userRoute };
