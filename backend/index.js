import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/connectDB.js";

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

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.get("/api/data", (req, res) => {
  const planets = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ];
  res.json({ planets });
});

app.listen(port, () => console.log(`server listening on Port ${port}`));
