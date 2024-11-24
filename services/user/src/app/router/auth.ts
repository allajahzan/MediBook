import { Router } from "express";
import { userLogin, clientSignup, doctorSignup } from "../controller/auth";

const router = Router();

// user login
router.post("/login", userLogin);

// user singup
router.post("/client/signup", clientSignup);

// doctor singup
router.post("/doctor/signup", doctorSignup);

export { router as authRoute };
