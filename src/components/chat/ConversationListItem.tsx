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

// Item da lista: assunto do chamado, data da última atividade e, embaixo à direita,
// a etiqueta da categoria
export function ConversationListItem({
  conversation,
  isActive,
  now,
  onSelect,
}: ConversationListItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(conversation.id)}
        aria-current={isActive ? "true" : undefined}
        className={`flex w-full flex-col gap-2 rounded-md border px-3 py-3 text-left transition-colors duration-150 ${
          isActive
            ? "border-line-strong bg-surface-raised"
            : "border-transparent hover:bg-surface-raised"
        }`}
      >
        <span className="flex w-full items-start justify-between gap-3">
          <span className="line-clamp-2 text-label text-ink">{conversation.title}</span>
          {now !== null ? (
            <time
              dateTime={new Date(conversation.updatedAt).toISOString()}
              className="shrink-0 pt-0.5 font-mono text-meta whitespace-nowrap text-ink-muted"
            >
              {formatRelativeTime(conversation.updatedAt, now)}
            </time>
          ) : null}
        </span>
        {conversation.category ? (
          <span className="flex justify-end">
            <Tag size="sm" category={conversation.category} />
          </span>
        ) : null}
      </button>
    </li>
  );
}
