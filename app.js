import express from "express";
import userRouter from "./routes/user.routes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.routes.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express();

config({ path: "./data/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use(errorMiddleware);
