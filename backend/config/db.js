import mongoose from "mongoose";
import dotenv from "dotenv";

// env file load karo
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};
