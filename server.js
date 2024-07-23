import express from "express";
import { Server as SocketIO } from 'socket.io';
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
const io = new SocketIO(
    httpserver,
    {
        cors: {
            origin: "*",  // Adjust this to your client's URL
        },
    },
);

// Socket.IO handling
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join a chat room
    socket.on('join-chat', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    // Send and receive messages
    socket.on('new-message', (newMessageReceived) => {
        console.log(newMessageReceived);
        const chat = newMessageReceived.chat;
        if (!chat.users) {
            console.log("Users are not defined in the chat object.");
            return;
        }
        io.to(chat._id).emit("message-Received", newMessageReceived);
    });

    // Disconnect handling
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

// Middleware
app.use(cors());
app.use(express.json());

// Error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message
    });
});

// Connect to MongoDB
ConnectDB();

// Routes
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

// Start server
const port = process.env.PORT || 4000;
httpserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
