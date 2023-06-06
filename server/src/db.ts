import { Request, Response } from "express";
import mongoose from "mongoose";
import app from "./index";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.DB_URI!);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Could not connect", err);
  }

  app.use((err: Error, req: Request, res: Response) => {
    res.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    });
  });
};

export default connectDB;
