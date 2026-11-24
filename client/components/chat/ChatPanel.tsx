"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { UiChatMessage } from "@/hooks/usePortfolioChat";
import ChatMessage from "./ChatMessage";
import ChatSuggestions from "./ChatSuggestions";

interface ChatPanelProps {
  open: boolean;
  messages: UiChatMessage[];
  isStreaming: boolean;
  error: string | null;
  onClose: () => void;
  onSend: (message: string) => void;
  onStop: () => void;
  onClear: () => void;
}

export default function ChatPanel({
  open,
  messages,
  isStreaming,
  error,
  onClose,
  onSend,
  onStop,
  onClear,
}: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, isStreaming, open]);

  function submit() {
    const value = draft.trim();
    if (value.length < 2 || isStreaming) return;
    setDraft("");
    onSend(value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  if (!open) return null;

  const showSuggestions = messages.length === 0;

  return (
    <div
      id="portfolio-chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Ask about Siddhant"
      className="glass-effect fixed inset-x-0 bottom-0 z-50 flex h-[min(85vh,640px)] flex-col overflow-hidden rounded-t-2xl border-t border-border shadow-[var(--shadow-card)] md:inset-x-auto md:right-6 md:bottom-24 md:h-[min(70vh,560px)] md:w-[400px] md:rounded-2xl md:border"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
        <div className="min-w-0 space-y-0.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
            Portfolio Assistant
          </p>
          <h2 className="truncate text-sm font-semibold text-foreground">
            Ask about Siddhant
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="rounded-lg px-2 py-1.5 text-xs text-muted transition-colors hover:bg-card hover:text-foreground"
            >
              Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
      </header>

      <div
        ref={listRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {showSuggestions ? (
          <ChatSuggestions disabled={isStreaming} onSelect={onSend} />
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </div>

      {error ? (
        <p className="border-t border-border/60 px-4 py-2 text-xs text-muted">
          {error}
        </p>
      ) : null}

      <form
        className="border-t border-border/70 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-border bg-input p-2">
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            maxLength={500}
            placeholder="Ask a question…"
            className="max-h-28 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-subtle"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={draft.trim().length < 2}
              className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
