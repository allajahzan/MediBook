import { Router } from "express";
import { addProfile, editProfile } from "../controller/profile";

const route = Router();

// add profile
route.get("/add", addProfile);

// edit profile
route.post("/edit", editProfile);

export { route as profileRoute };
