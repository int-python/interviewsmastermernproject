import express from "express";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

// Using Error Middleware
app.use(errorMiddleware);
