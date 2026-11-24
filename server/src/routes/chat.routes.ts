// server/src/routes/chat.routes.ts
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { handleChat } from "../controllers/chat.controllers.js";

export const chatRouter = Router();

const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25,                  // 25 questions per IP per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many questions sent. Please wait a few minutes and try again.",
  },
});

chatRouter.post("/", chatRateLimiter, handleChat);