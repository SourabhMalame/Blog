import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "❌ MONGODB_URI is missing. Please set it in your .env.local file"
  );
}

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

// Check if mongoose is already connected
function isConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * Connect to MongoDB database
 * Uses connection pooling and caching to reuse connections
 * Only connects once, subsequent calls reuse the existing connection
 * This should be called at login to establish the connection
 */
export async function connectDB() {
  // If mongoose is already connected, return immediately (no need to check cache)
  if (isConnected()) {
    return mongoose.connection;
  }

  // If connection exists in cache and is still valid, return it
  if (cached.conn && isConnected()) {
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (cached.promise) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (error) {
      cached.promise = null;
      throw error;
    }
  }

  // Create new connection promise
  cached.promise = mongoose.connect(MONGODB_URI, {
    bufferCommands: false, // Fail fast if not connected
    serverSelectionTimeoutMS: 10000, // Increased timeout
    socketTimeoutMS: 45000, // Socket timeout
    connectTimeoutMS: 10000, // Connection timeout
    retryWrites: true,
    w: "majority",
  });

  try {
    cached.conn = await cached.promise;
    console.log("✅ Mongoose connected to MongoDB");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      cached.conn = null;
      cached.promise = null;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
      cached.conn = null;
      cached.promise = null;
    });

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error("Failed to connect to MongoDB:", error);

    // Provide more helpful error messages
    if (error.code === "ECONNREFUSED") {
      console.error(
        "❌ MongoDB connection refused. Please check:\n" +
          "1. Your MongoDB Atlas cluster is running\n" +
          "2. Your IP address is whitelisted in MongoDB Atlas\n" +
          "3. Your connection string is correct\n" +
          "4. Your network connection is working"
      );
    } else if (error.name === "MongoServerError") {
      console.error("❌ MongoDB server error:", error.message);
    } else if (error.name === "MongoNetworkError") {
      console.error("❌ MongoDB network error:", error.message);
    }

    throw error;
  }
}

/**
 * Ensure database is connected (for routes that assume connection exists)
 * If not connected, will connect (fallback for routes called before login)
 */
export async function ensureConnected() {
  if (isConnected()) {
    return mongoose.connection;
  }
  // Fallback: connect if not already connected
  return await connectDB();
}
