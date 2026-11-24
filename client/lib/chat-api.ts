export type ChatRole = "user" | "assistant";

export interface ChatHistoryTurn {
  role: ChatRole;
  content: string;
}

export interface SourceCitation {
  section: string;
  title: string;
  score: number;
}

export type ChatSseEvent =
  | { type: "sources"; sources: SourceCitation[] }
  | { type: "token"; content: string }
  | { type: "done" }
  | { type: "error"; message: string };

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

function getChatEndpoint(): string {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return `${API_BASE}/api/chat`;
}

async function* parseSseStream(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal
): AsyncGenerator<ChatSseEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      if (signal?.aborted) break;

      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() ?? "";

      for (const chunk of chunks) {
        const line = chunk
          .split("\n")
          .map((l) => l.trim())
          .find((l) => l.startsWith("data:"));

        if (!line) continue;

        const payload = line.replace(/^data:\s?/, "");
        if (!payload || payload === "[DONE]") continue;

        try {
          yield JSON.parse(payload) as ChatSseEvent;
        } catch {
          // Ignore malformed SSE frames
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function* streamPortfolioChat(
  message: string,
  history: ChatHistoryTurn[],
  signal?: AbortSignal
): AsyncGenerator<ChatSseEvent> {
  const response = await fetch(getChatEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ message, history }),
    signal,
  });

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) detail = data.error;
    } catch {
      // keep status fallback
    }
    yield { type: "error", message: detail };
    return;
  }

  if (!response.body) {
    yield { type: "error", message: "No response stream from server." };
    return;
  }

  yield* parseSseStream(response.body, signal);
}
