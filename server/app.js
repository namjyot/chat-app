import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import { connectToDB } from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cookies());
const server = createServer(app);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
});
dotenv.config({ path: "./config.env" });
connectToDB();

cloudinary.config({
  cloud_name: "dfsjlew69",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
  });
  socket.on("send-message", (message, roomId, userId) => {
    io.to(roomId).emit("receive-message", message);
    userId.map((id) => {
      io.to(id).emit("fetch-data");
    });
  });
  socket.on("fetch-groups", (userId) => {
    userId.map((id) => {
      io.to(id).emit("fetch-data");
    });
  });
});

app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server Started`);
});
