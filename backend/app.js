import express from "express";
import { config as dotenvConfig } from "dotenv";
import { errorMiddleware } from "./server/middleWares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import college from "./server/routes/college.js";
import userRouter from "./server/routes/user.js";

// Load environment variables from .env file
dotenvConfig();

const app = express();

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent along with the request
  })
);

// importing Router here
app.get("/", (req, res, next) => {
  res.send("working");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/college", college);

// using Error middleware
app.use(errorMiddleware);

export default app;
