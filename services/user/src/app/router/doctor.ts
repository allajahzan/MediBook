import { Router } from "express";
import { getDocProfiles } from "../controller/doctor";

const router = Router();

// doctor profile
router.get("/profile", getDocProfiles);

export { router as doctorRoute };
