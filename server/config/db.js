/**
 * MongoDB connection helper.
 *
 * Purpose: connect Mongoose to the configured database before serving requests.
 */
import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB using environment configuration.
 *
 * @returns {Promise<void>} Resolves when the database connection is ready.
 * @sideeffects Opens a process-wide Mongoose connection and exits the process on fatal failure.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "job-portal",
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error);
    process.exit(1);
  }
};

export default connectDB;
