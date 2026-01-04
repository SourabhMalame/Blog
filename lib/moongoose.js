import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("❌ MONGODB_URI missing");

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // 🔥 fail fast
      serverSelectionTimeoutMS: 5000,
    });
  }

  cached.conn = await cached.promise;
  console.log("✅ Mongoose connected");
  return cached.conn;
}
