import { Router } from "express";
import { addProfile, editProfile } from "../controller/profile";

const route = Router();

// add profile
route.post("/add", addProfile);

// edit profile
route.patch("/edit", editProfile);

export { route as profileRoute };
