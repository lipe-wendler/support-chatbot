import { IconButton } from "@/components/ui/IconButton";
import { Tag } from "@/components/ui/Tag";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { Conversation } from "@/lib/types";

interface ChatHeaderProps {
  conversation: Conversation;
  drawerId: string;
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
}

// Topo da conversa aberta: botão da gaveta (só no celular), título, categoria
// e, à direita, o botão de tema
export function ChatHeader({ conversation, drawerId, isDrawerOpen, onOpenDrawer }: ChatHeaderProps) {
  return (
    <header className="flex min-h-18 items-center gap-3 border-b border-line bg-surface px-4 py-3 md:px-6">
      <IconButton
        icon="menu"
        label="Abrir lista de conversas"
        onClick={onOpenDrawer}
        aria-expanded={isDrawerOpen}
        aria-controls={drawerId}
        aria-haspopup="dialog"
        className="md:hidden"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <h2 className="truncate font-display text-xl leading-7 font-semibold tracking-[-0.01em]">
          {conversation.title}
        </h2>
        {conversation.category ? (
          <span className="flex">
            <Tag size="sm" category={conversation.category} />
          </span>
        ) : null}
      </div>
      <ThemeToggle />
    </header>
  );
}
