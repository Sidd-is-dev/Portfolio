// server/src/config/db.ts
import mongoose from "mongoose";
import { env } from "./env.js";
import dns from "node:dns/promises";


dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(env.MONGODB_URI, {
    dbName: "rag_portfolio",
  });
  console.log("MongoDB Atlas connected");
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}