import express from "express";
const app = express();
import cors from "cors";
import router from "./routes/Router";
import dotenv from "dotenv";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
dotenv.config({ path: "./src/.env" });

export default app;
