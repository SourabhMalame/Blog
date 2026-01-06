// Database connection utility
// This ensures we only connect once and reuse the connection
import { connectDB } from "./moongoose";

// This will be called once when the module is imported
// Connection is cached and reused across all API routes
let isInitialized = false;

export async function ensureDBConnection() {
  if (!isInitialized) {
    try {
      await connectDB();
      isInitialized = true;
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }
  return true;
}

// Export connectDB for backward compatibility
export { connectDB };

