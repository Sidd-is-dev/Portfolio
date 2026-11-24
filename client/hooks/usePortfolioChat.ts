"use client";

import { useEffect, useRef, useState } from "react";
import {
  streamPortfolioChat,
  type ChatHistoryTurn,
  type SourceCitation,
} from "@/lib/chat-api";

export interface UiChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceCitation[];
  pending?: boolean;
}

const MAX_HISTORY_TURNS = 6;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function usePortfolioChat() {
  const [messages, setMessages] = useState<UiChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  function stop() {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((m) => (m.pending ? { ...m, pending: false } : m))
    );
  }

  async function sendMessage(raw: string) {
    const message = raw.trim();
    if (message.length < 2 || isStreaming) return;

    setError(null);

    const history: ChatHistoryTurn[] = messages
      .filter((m) => !m.pending && m.content.trim().length > 0)
      .slice(-MAX_HISTORY_TURNS)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 1500),
      }));

    const userId = createId();
    const assistantId = createId();

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: message },
      {
        id: assistantId,
        role: "assistant",
        content: "",
        sources: [],
        pending: true,
      },
    ]);

    const controller = new AbortController();
    abortRef.current = controller;
    setIsStreaming(true);

    try {
      for await (const event of streamPortfolioChat(
        message,
        history,
        controller.signal
      )) {
        if (controller.signal.aborted) break;

        if (event.type === "sources") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, sources: event.sources } : m
            )
          );
        } else if (event.type === "token") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + event.content }
                : m
            )
          );
        } else if (event.type === "error") {
          setError(event.message);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    pending: false,
                    content:
                      m.content ||
                      "I couldn't generate a response right now. Please try again.",
                  }
                : m
            )
          );
        } else if (event.type === "done") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, pending: false } : m
            )
          );
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError("Something went wrong. Please try again.");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                pending: false,
                content:
                  m.content ||
                  "I couldn't generate a response right now. Please try again.",
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, pending: false } : m
        )
      );
    }
  }

  function clear() {
    stop();
    setMessages([]);
    setError(null);
  }

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    stop,
    clear,
  };
}
