import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], // Allowing your specific front-end origin
        methods: ["GET", "POST"],
    },
});


export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}



const userSocketMap = {};

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
