import express from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./database/Config.js";
import AuthRouter from './Routers/AuthRouter.js';
import UserRouter from './Routers/UserRouter.js';
import TaskRouter from './Routers/TaskRouter.js';
import ChatRouter from './Routers/ChatRouter.js';
import ProjectRouter from './Routers/ProjectRouter.js';
import MessageRouter from './Routers/MessageRouter.js';

dotenv.config();

const app = express();
const httpserver = createServer(app);
const socket = new Server(httpserver, {
    cors: {
        origin: "*",  // Adjust this to your client's URL
    },
});

socket.on('connection', (socket) => {
    console.log(socket.id);
    //checking socket
    /* socket.on('setup', (userData) => {
        socket.join(userData._id)
        //console.log(userData._id);
        socket.emit('connected');
    }); */
    
    // join chat
    socket.on('join-chat', (room) => {
        socket.join(room);
        console.log("user Joined room:",room);
    });

    //
    socket.on('new-message', (newMessageRecivied) => {
        const chat = newMessageRecivied.chat;
    
        if (!chat.users) {
            console.log("Users are not defined in the chat object.");
            return;
        }
    
        chat.users.forEach(user => {
            if (user._id === newMessageRecivied.sender._id) {
                return; 
            }
            socket.emit('message',newMessageRecivied);
            socket.to(user._id).emit("message-Recivied", newMessageRecivied);
            console.log(`Message sent to user ${user._id}`);
        });
    });
    
});

app.use(cors());
app.use(express.json());

// Error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message
    });
});

ConnectDB();

const port = process.env.PORT || 4000; // Set a default port if not provided

// Default Route
app.get("/", (req, res) => {
    res.status(200).send("API is running");
});

// API routes
app.use('/api/user', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/task', TaskRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/message', MessageRouter);
app.use('/api/project', ProjectRouter);

httpserver.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
