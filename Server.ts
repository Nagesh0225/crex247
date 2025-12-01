import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://nageshpatidar021999_db_user:6vQwTe4kyYJRGsJu@crex247.hpp77pi.mongodb.net/?appName=crex247")
  .then(() => console.log("MongoDB Connected-----"));



app.listen(5000, () => console.log("Server Running on 5000"));
