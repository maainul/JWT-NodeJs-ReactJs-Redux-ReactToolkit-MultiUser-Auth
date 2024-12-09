import express from "express";
import setupRoutes from "./appRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
const PORT = 8081;

setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

export default app;
