import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect("mongodb+srv://nageshpatidar021999_db_user:wQWaTxXvikb8ITVI@crex247.hpp77pi.mongodb.net/?appName=crex247");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
