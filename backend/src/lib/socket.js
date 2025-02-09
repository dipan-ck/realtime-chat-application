import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();

const server = http.createServer(app);


const userSocketMap = {};

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


  export function getReceiverSocketId(userId){
    return userSocketMap[userId];
  }






io.on("connection", (socket) => {
    console.log("socket connected", socket.id);

    const userId = socket.handshake.query.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", () => {
        console.log("socket disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, server, app };