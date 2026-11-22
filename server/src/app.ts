// server/src/app.ts
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./config/env.js";

export const app = express();

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.status(dbReady ? 200 : 503).json({
    status: dbReady ? "ok" : "degraded",
    db: dbReady ? "connected" : "disconnected",
  });
});