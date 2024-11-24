import { Router } from "express";
import { userLogin, userSignup } from "../controller/auth";

const router = Router()

// user login
router.post('/login', userLogin)

// user singup
router.post('/signup', userSignup)

export { router as authRoute }