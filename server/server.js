import "./config/instrument.js";
import { v2 as cloudinary } from "cloudinary";
import express from "express";
import * as Sentry from "@sentry/node";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import clerkWebhooks from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ quiet: true });

// initialize express
const app = express();

// connect to mongodb database
await connectDB();

// connect to cloudinary
await connectCloudinary();

// middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);

// start server
const PORT = process.env.PORT || 5000;

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
