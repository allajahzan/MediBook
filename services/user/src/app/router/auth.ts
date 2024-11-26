import { Router } from "express";
import { userLogin, clientSignup, doctorSignup } from "../controller/auth";

const router = Router();

// user login
router.post("/login", userLogin);

// user singup
router.post("/signup", clientSignup);

// doctor singup
router.post("/signup/doctor", doctorSignup);

export { router as authRoute };
