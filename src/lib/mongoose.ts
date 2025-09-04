// src/lib/mongoose.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async (): Promise<void> => {
  // Use strictQuery to avoid deprecation warnings
  mongoose.set("strictQuery", true);

  // Already connected, reuse the connection (avoids multiple connections in dev)
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  try {
    await mongoose.connect(mongoURI, {
      dbName: "MossDB", // replace with your actual DB name
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDB;