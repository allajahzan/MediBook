import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@mb-medibook/common";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Authorization } from "./middleware/authorization";

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

// start server
const startServer = () => {
    try {
        // reverse proxy - routing requests
        app.use(
            "/user",
            createProxyMiddleware({ target: services.user, changeOrigin: true })
        );

        app.use(
            "/doctor",
            Authorization,
            createProxyMiddleware({ target: services.user, changeOrigin: true })
        );
        app.use(
            "/admin",
            Authorization,
            createProxyMiddleware({ target: services.user, changeOrigin: true })
        );

        // listen port
        app.listen(process.env.PORT, () => {
            console.log("api gateway server is running on port 8080");
        });
    } catch (err: any) {
        console.log(err.message);
    }
};

startServer();
