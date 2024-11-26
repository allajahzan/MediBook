import { Router } from "express";
import { clientRoute } from "../router/client";
import { profileRoute } from "../router/profile";
const route = Router();

// client route
route.use("/clients", clientRoute);

// profile route
route.use("/profile", profileRoute);

export { route as appRouter };
