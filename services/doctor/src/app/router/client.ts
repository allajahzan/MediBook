import { Router } from "express";
import { getClients } from "../controller/client";

const route = Router();

// get booked client list
route.get("/", getClients);

export { route as clientRoute };
