import type { ReactNode } from "react";
import type { UiChatMessage } from "@/hooks/usePortfolioChat";

interface ChatMessageProps {
  message: UiChatMessage;
}

type MessageBlock =
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] };

function parseMessage(content: string): MessageBlock[] {
  const blocks: MessageBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", content: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.replace(/^\s{0,3}#{1,6}\s+/, "").trim();
    const listItem = line.match(/^(?:[-*•]|\d+[.)])\s+(.+)$/);

    if (!line) {
      flushParagraph();
      flushList();
    } else if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
    } else {
      flushList();
      paragraph.push(line);
    }
  }

  flushParagraph();
  flushList();
  return blocks;
}

function renderInlineFormatting(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const contentBlocks = isUser ? [] : parseMessage(message.content);

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
          isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="space-y-2">
              {contentBlocks.map((block, index) =>
                block.type === "list" ? (
                  <ul key={index} className="list-disc space-y-1 pl-5">
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{renderInlineFormatting(item)}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={index}>{renderInlineFormatting(block.content)}</p>
                )
              )}
            </div>
          )
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
