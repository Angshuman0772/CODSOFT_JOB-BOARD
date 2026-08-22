/**
 * MongoDB connection helper.
 *
 * Purpose: connect Mongoose to the configured database before serving requests.
 * Uses connection caching for serverless environments (Vercel).
 */
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection to MongoDB using environment configuration.
 * Reuses an existing connection on warm serverless invocations.
 *
 * @returns {Promise<typeof mongoose>} Resolves when the database connection is ready.
 */
const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "job-portal",
      })
      .then((mongooseInstance) => {
        console.log("MongoDB Connected");
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error("MongoDB Error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
