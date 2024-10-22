import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth_route.js";
import listingRoutes from "./routes/listing_route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// To make input as JSON
app.use(express.json());

app.use(cors());

app.use(express.static("public"));
app.listen(4000, () => {
  console.log(`Server is running on port 4000...`);
});

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
