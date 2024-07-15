import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./database/Config.js"
import AuthRouter from './Routers/AuthRouter.js';
import UserRouter from './Routers/UserRouter.js';
import TaskRouter from './Routers/TaskRouter.js';
import ChatRouter from './Routers/ChatRouter.js';
import ProjectRouter from './Routers/ProjectRouter.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//error handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message
    });
});

ConnectDB();

const port = process.env.PORT;
//Default Route
app.get("/",(req,res)=>{
    res.status(200).send("API is running");
});


//Api routes
//Auth routes
app.use('/api/user',AuthRouter);
//User routes
app.use('/api/user',UserRouter);
//task routes
app.use('/api/task',TaskRouter);
//chat routes
app.use('/api/chat',ChatRouter);
//project routes
app.use('/api/project',ProjectRouter);

app.listen(port,()=>{
    console.log("App is running",port);
});