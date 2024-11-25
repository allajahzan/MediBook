import express from "express";
import { appRouter } from "./router/route";
import morgan from "morgan";
import { ErrorHandler } from "@mb-medibook/common";
import { checkAuth } from "./middleware/checkAuth";

// create an app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use((req,res,next)=>{
    console.log('asdf');
    
})
app.use("/", checkAuth,appRouter);

// error handler
app.use(ErrorHandler);

export default app;
