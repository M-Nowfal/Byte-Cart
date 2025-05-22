import mongoose from "mongoose";

let isConnected = false;

const connectDataBase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  const DB_URI = process.env.MONGO_DB_URI;

  if (!DB_URI) {
    throw new Error("MONGO_DB_URI environment variable is not defined");
  }

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log("Database connected successfully");
  } catch (err: any) {
    console.error("Database connection failed:", err.message);
  }
};

export default connectDataBase;
