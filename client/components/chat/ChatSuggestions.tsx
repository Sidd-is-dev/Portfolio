const SUGGESTIONS = [
  "What projects has Siddhant worked on?",
  "What is his tech stack?",
  "Tell me about his internship experience",
] as const;

interface ChatSuggestionsProps {
  disabled?: boolean;
  onSelect: (prompt: string) => void;
}

export default function ChatSuggestions({
  disabled = false,
  onSelect,
}: ChatSuggestionsProps) {
  return (
    <div className="space-y-3 px-1">
      <p className="text-sm text-muted">
        Ask about Siddhant&apos;s experience, projects, skills, or education.
      </p>
      <div className="flex flex-col gap-2">
        {SUGGESTIONS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(prompt)}
            className="rounded-xl border border-border bg-surface px-3.5 py-2.5 text-left text-sm text-muted transition-colors hover:border-primary hover:bg-card hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
