import type { UiChatMessage } from "@/hooks/usePortfolioChat";

interface ChatMessageProps {
  message: UiChatMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-foreground"
        }`}
      >
        {message.content ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : message.pending ? (
          <span className="inline-flex items-center gap-1 text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary [animation-delay:300ms]" />
          </span>
        ) : null}
      </div>

      {!isUser && message.sources && message.sources.length > 0 ? (
        <div className="flex max-w-[92%] flex-wrap gap-1.5">
          {message.sources.map((source) => (
            <span
              key={`${source.section}-${source.title}`}
              className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {source.section} · {source.title}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
