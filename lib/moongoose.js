import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://sourabhmalame:sourabh1234@pgadmin.evcqvgp.mongodb.net/?appName=pgadmin";
if (!MONGODB_URI) throw new Error("❌ MONGODB_URI missing");

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
    serverSelectionTimeoutMS: 5000,
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
