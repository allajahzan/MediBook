import express from "express";
import morgan from "morgan";
import { appRouter } from "./router/router";
import { ErrorHandler } from "@mb-medibook/common";
import { checkAuth } from "./middleware/checkAuth";

// create app
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/", checkAuth, appRouter);

// error handler
app.use(ErrorHandler);

export default app;
