import { Avatar } from "@/components/ui/Avatar";
import { formatClockTime } from "@/lib/format-relative-time";
import type { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
  customerName: string;
  /** Hora atual; null até a página montar no navegador (o horário só aparece depois) */
  now: number | null;
}

// Balão de mensagem com o avatar ao lado: quem pede suporte fica à direita, em amarelo,
// com "U" (usuário); o atendente fica à esquerda, na superfície elevada, com "C" (chatbot).
export function MessageBubble({ message, customerName, now }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const author = isUser ? customerName : "Atendente";

  return (
    <li className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar initial={isUser ? "U" : "C"} tone={isUser ? "neutral" : "accent"} />
      <div
        className={`flex max-w-[85%] min-w-0 flex-col gap-1 sm:max-w-[70%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-lg px-4 py-3 text-body break-words whitespace-pre-wrap ${
            isUser
              ? "rounded-tr-sm bg-accent text-on-accent"
              : "rounded-tl-sm border border-line bg-surface-raised text-ink"
          }`}
        >
          <span className="sr-only">{author} disse: </span>
          {message.content}
        </div>
        <span className="px-1 font-mono text-meta text-ink-muted">
          <span aria-hidden="true">{author}</span>
          {now !== null ? (
            <>
              <span aria-hidden="true"> · </span>
              <time dateTime={new Date(message.createdAt).toISOString()}>
                {formatClockTime(message.createdAt)}
              </time>
            </>
          ) : null}
        </span>
      </div>
    </li>
  );
}
