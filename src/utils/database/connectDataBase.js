import mongoose from "mongoose";

let isConnect = false;

const connectDataBase = async () => {
  try {
    if (isConnect) {
      console.log("Using existing connection");
      return;
    } else {
      const DB_URI = process.env.MONGO_DB_URI;
      await mongoose.connect(DB_URI);
      console.log("DataBase connected successfully!");
      isConnect = true;
    }
  } catch (err) {
    console.log("DataBase connection failed", err);
  }
}

export default connectDataBase;