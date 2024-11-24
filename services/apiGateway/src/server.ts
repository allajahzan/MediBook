import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

// create app
const app = express();

// dotenv config
dotenv.config();

// middleware
app.use(morgan('dev'))

// services
const services = {
    user: 'http://localhost:3000',
    admin: 'http://localhost:3001',
    doctor: 'http://localhost:3002',
}

// reverse proxy - routing request
app.use('/user', createProxyMiddleware({ target: services.user, changeOrigin: true }))
app.use('/doctor', createProxyMiddleware({ target: services.user, changeOrigin: true }))
app.use('/admin', createProxyMiddleware({ target: services.user, changeOrigin: true }))

// listen port
app.listen(process.env.PORT, () => {
    console.log("api gateway server is running on port 8080");
});
