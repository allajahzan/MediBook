import express from "express";
import { appRouter } from "./router/router";
import morgan from "morgan";
import { ErrorHandler } from "@mb-medibook/common";

// create an app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/", appRouter);

// error handler
app.use(ErrorHandler);

export default app;
