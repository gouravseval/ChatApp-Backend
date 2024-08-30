import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "https://chatappbygourav.netlify.app", 
    methods: ["GET", "POST"],
    credentials: true, 
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://chatappbygourav.netlify.app", // Update this to your actual front-end URL
        methods: ["GET", "POST"],
        credentials: true, // Allow credentials
    },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
        socket.join(userId); // Optional: Join a room with userId
        io.emit("onlineUsers", Object.keys(userSocketMap));
    } else {
        console.log(`User ID is undefined for socket ID ${socket.id}`);
    }

    socket.on("disconnect", () => {
        if (userId !== undefined) {
            delete userSocketMap[userId];
            io.emit("onlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, server, io };
