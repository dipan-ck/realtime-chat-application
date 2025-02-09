import dotenv from "dotenv"
import express from 'express';
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import {app, io, server} from "./lib/socket.js";
import path from "path";

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

dotenv.config({ path: "../.env" });

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
}


const PORT = process.env.PORT;

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoutes);

server.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
});