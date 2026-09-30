import { Tag } from "@/components/ui/Tag";
import { formatRelativeTime } from "@/lib/format-relative-time";
import type { Conversation } from "@/lib/types";

interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  /** Hora atual; null até a página montar no navegador */
  now: number | null;
  onSelect: (conversationId: string) => void;
}

export function ConversationListItem({
  conversation,
  isActive,
  now,
  onSelect,
}: ConversationListItemProps) {
  const lastMessage = conversation.messages.at(-1);
  const preview = lastMessage?.content ?? "Conversa sem mensagens";

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(conversation.id)}
        aria-current={isActive ? "true" : undefined}
        className={`flex w-full flex-col gap-1 rounded-md border px-3 py-3 text-left transition-colors duration-150 ${
          isActive
            ? "border-line-strong bg-surface-raised"
            : "border-transparent hover:bg-surface-raised"
        }`}
      >
        <span className="flex w-full items-baseline justify-between gap-3">
          <span className="truncate text-label text-ink">{conversation.customerName}</span>
          {now !== null ? (
            <time
              dateTime={new Date(conversation.updatedAt).toISOString()}
              className="shrink-0 font-mono text-meta text-ink-muted"
            >
              {formatRelativeTime(conversation.updatedAt, now)}
            </time>
          ) : null}
        </span>
        <span className="line-clamp-1 text-small text-ink-muted">{preview}</span>
        {conversation.category ? (
          <span className="mt-1 flex">
            <Tag size="sm" category={conversation.category} />
          </span>
        ) : null}
      </button>
    </li>
  );
}
