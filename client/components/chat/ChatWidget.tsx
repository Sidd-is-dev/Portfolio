"use client";

import { useEffect, useState } from "react";
import { usePortfolioChat } from "@/hooks/usePortfolioChat";
import ChatPanel from "./ChatPanel";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { messages, isStreaming, error, sendMessage, stop, clear } =
    usePortfolioChat();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function handleClose() {
    if (isStreaming) stop();
    setOpen(false);
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Dismiss chat overlay"
          className="fixed inset-0 z-40 bg-background/40 backdrop-blur-[2px] md:hidden"
          onClick={handleClose}
        />
      ) : null}

      <ChatPanel
        open={open}
        messages={messages}
        isStreaming={isStreaming}
        error={error}
        onClose={handleClose}
        onSend={sendMessage}
        onStop={stop}
        onClear={clear}
      />

      <button
        type="button"
        aria-expanded={open}
        aria-controls="portfolio-chat-panel"
        onClick={() => (open ? handleClose() : setOpen(true))}
        className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-[var(--glow-primary)] transition-colors hover:bg-primary-hover md:right-6 md:bottom-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        {open ? "Close" : "Ask AI"}
      </button>
    </>
  );
}
