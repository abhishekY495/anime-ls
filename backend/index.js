import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/config/connectDB.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware.js";
import { notFound } from "./src/middlewares/notFoundMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "PROD"
        ? process.env.CORS_ORIGIN
        : process.env.LOCAL_HOST,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Server is live", live: true });
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server listening on Port ${port}`));
