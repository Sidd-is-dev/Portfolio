// server/src/controllers/chat.controller.ts
import type { Request, Response } from "express";
import { z } from "zod";
import { answerPortfolioQuery } from "../services/rag.service.js";


const chatRequestSchema = z.object({
    message: z
    .string()
    .trim()
    .min(2, "Question is too short")
    .max(500, "Question must be under 500 characters"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1500),
      })
    )
    .max(6)
    .optional()
    .default([]),
})

function writeSseEvent(res: Response, payload: Record<string, unknown>) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}


export async function handleChat(req: Request, res: Response): Promise<void> {
  const parsed = chatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid request",
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const abortController = new AbortController();
  res.on("close", () => {
    if (!res.writableEnded) {
      abortController.abort();
    }
  });

  // Open SSE stream
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Prevents proxy buffering on Render/Nginx
  res.flushHeaders();

  try {
    const { sources, stream } = await answerPortfolioQuery(
      parsed.data.message,
      parsed.data.history,
      abortController.signal
    );

    writeSseEvent(res, { type: "sources", sources });

    for await (const token of stream) {
      if (abortController.signal.aborted) break;
      writeSseEvent(res, { type: "token", content: token });
    }
    writeSseEvent(res, { type: "done" });
  } catch (err) {
    if (!abortController.signal.aborted) {
      console.error("Chat stream error:", err);
      writeSseEvent(res, {
        type: "error",
        message: "Something went wrong generating a response. Please try again.",
      });
    }
  } finally {
    res.end();
  }
}

