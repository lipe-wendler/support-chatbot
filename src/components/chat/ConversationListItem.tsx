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

// Item da lista: assunto do chamado e data da última atividade; embaixo, a última mensagem
// e, à direita, a etiqueta da categoria. Assunto e mensagem ocupam uma linha cada,
// com "..." quando não cabem.
export function ConversationListItem({
  conversation,
  isActive,
  now,
  onSelect,
}: ConversationListItemProps) {
  const lastMessage = conversation.messages.at(-1);
  const preview = lastMessage?.content ?? "Nenhuma mensagem ainda";

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(conversation.id)}
        aria-current={isActive ? "true" : undefined}
        className={`flex w-full flex-col gap-1 rounded-md px-3 py-3 text-left transition-colors duration-150 ${
          isActive ? "bg-accent/15" : "hover:bg-surface-raised"
        }`}
      >
        <span className="flex w-full items-baseline gap-3">
          <span className="min-w-0 flex-1 truncate text-label text-ink">{conversation.title}</span>
          {now !== null ? (
            <time
              dateTime={new Date(conversation.updatedAt).toISOString()}
              className="shrink-0 font-mono text-meta whitespace-nowrap text-ink-muted"
            >
              {formatRelativeTime(conversation.updatedAt, now)}
            </time>
          ) : null}
        </span>
        <span className="flex w-full items-center gap-3">
          <span className="min-w-0 flex-1 truncate text-small text-ink-muted">{preview}</span>
          {conversation.category ? <Tag size="sm" category={conversation.category} /> : null}
        </span>
      </button>
    </li>
  );
}
