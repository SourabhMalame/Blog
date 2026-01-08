import { MongoClient } from "mongodb";

// Next.js: Access env vars at runtime, not at module level
// This prevents build-time errors
function getMongoDBUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing. Please set it in your environment variables");
  }
  return uri;
}

let client;
let clientPromise;

export async function connectDB() {
  // Get URI at runtime, not at module level
  const uri = getMongoDBUri();
  
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
  const clientInstance = await clientPromise;
  return clientInstance.db(); // DB name from URI
}
