import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import type { Conversation } from "@/lib/types";
import { ConversationListItem } from "./ConversationListItem";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  now: number | null;
  onSelect: (conversationId: string) => void;
  onNewConversation: () => void;
  /** Ação extra no topo, ao lado do logo (ex.: botão de fechar da gaveta) */
  headerAction?: ReactNode;
}

// Coluna de conversas: logo, botão de nova conversa e a lista.
// É usada tanto na coluna fixa do desktop quanto na gaveta do celular.
export function ConversationSidebar({
  conversations,
  activeConversationId,
  now,
  onSelect,
  onNewConversation,
  headerAction,
}: ConversationSidebarProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-col gap-4 border-b border-line p-4">
        <div className="flex min-h-11 items-center justify-between gap-3">
          <Wordmark />
          {headerAction}
        </div>
        <Button variant="outline" iconLeft="plus" onClick={onNewConversation} className="w-full">
          Nova conversa
        </Button>
      </div>

      <h2 className="px-4 pt-4 pb-2 font-mono text-eyebrow text-ink-muted uppercase">Conversas</h2>
      <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 pb-4">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            now={now}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
