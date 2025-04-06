import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import movieRouter from "./routes/movie.route.js";
import bookingRouter from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app); 
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://client:5173"],
    credentials: true,
  },
});

app.use(cors({
  origin: ["http://localhost:5173", "http://client:5173"], 
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://mongo:27017/movie-booking')
  .then(() => console.log("Connected to MongoDB Successfully!"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ movieId, date }) => {
    const roomName = `${movieId}-${date}`;
    socket.join(roomName);
    console.log(`${socket.id} joined room ${roomName}`);
  });

  socket.on("seatUpdated", ({ movieId, date, seatNumbers }) => {
    const roomName = `${movieId}-${date}`;
    io.to(roomName).emit("updateSeats", { seatNumbers });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/booking", bookingRouter);


app.get("/", (req,res)=>{
  res.send("server is running on this port");
})

server.listen(9000, () => console.log("Server is running on Port 9000!"));
