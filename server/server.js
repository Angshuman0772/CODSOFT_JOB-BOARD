import "./config/instrument.js";
import express from "express";
import * as Sentry from "@sentry/node";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import clerkWebhooks from "./controllers/webhooks.js";

dotenv.config();

// initialize express
const app = express();

// connect to mongodb database
await connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);

// start server
const PORT = process.env.PORT || 5000;

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
