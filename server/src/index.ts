import express from "express";
const app = express();
import cors from "cors";
import router from "./routes/Router";
import dotenv from "dotenv";

const corsOptions = {
  origin: "https://fullstack-test-g43a.onrender.com",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
dotenv.config({ path: "./src/.env" });

export default app;
