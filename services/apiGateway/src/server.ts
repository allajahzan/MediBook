import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { ErrorHandler } from "@mb-medibook/common";
import { createProxyMiddleware } from "http-proxy-middleware";
// import { Authorization } from "./middleware/authorization";
import { envChecker } from "./config/env.checker";

// create app
const app = express();

// dotenv config
dotenv.config();

// middleware
app.use(morgan("dev"));

// services
const services = {
    user: "http://localhost:3000",
    admin: "http://localhost:3001",
    doctor: "http://localhost:3002",
};

// cors setup
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type"],
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    })
);

// check env
envChecker()

// reverse proxy - routing requests
app.use(
    "/user",
    createProxyMiddleware({ target: services.user, changeOrigin: true })
);

app.use(
    "/doctor",
    createProxyMiddleware({ target: services.user, changeOrigin: true })
);

app.use(
    "/admin",
    createProxyMiddleware({ target: services.user, changeOrigin: true })
);

// global error handler
app.use(ErrorHandler)

// listen port
app.listen(process.env.PORT, () => {
    console.log("api gateway server is running on port 8080");
});
