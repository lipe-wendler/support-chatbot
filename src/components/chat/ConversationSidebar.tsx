"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Wordmark } from "@/components/ui/Wordmark";
import { toSearchTerms } from "@/lib/search-conversations";
import type { Conversation } from "@/lib/types";
import { ConversationListItem } from "./ConversationListItem";
import { ConversationSearch } from "./ConversationSearch";

interface ConversationSidebarProps {
  /** Conversas já filtradas pela busca */
  conversations: Conversation[];
  activeConversationId: string;
  now: number | null;
  onSelect: (conversationId: string) => void;
  onNewConversation: () => void;
  isSearchOpen: boolean;
  searchQuery: string;
  onSearchOpen: () => void;
  onSearchQueryChange: (query: string) => void;
  onSearchClose: () => void;
  /** Ação extra no topo, ao lado do logo (ex.: botão de fechar da gaveta) */
  headerAction?: ReactNode;
}

function resultsMessage(count: number): string {
  if (count === 0) return "Nenhuma conversa encontrada.";
  return count === 1 ? "1 conversa encontrada." : `${count} conversas encontradas.`;
}

// Coluna de conversas: logo, busca, botão de nova conversa e a lista.
// É usada tanto na coluna fixa do desktop quanto na gaveta do celular.
export function ConversationSidebar({
  conversations,
  activeConversationId,
  now,
  onSelect,
  onNewConversation,
  isSearchOpen,
  searchQuery,
  onSearchOpen,
  onSearchQueryChange,
  onSearchClose,
  headerAction,
}: ConversationSidebarProps) {
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const shouldFocusSearchButtonRef = useRef(false);
  const searchTerms = isSearchOpen ? toSearchTerms(searchQuery) : [];
  const isFiltering = searchTerms.length > 0;

  // Quando a pessoa fecha a busca, o foco volta para a lupa
  useEffect(() => {
    if (isSearchOpen || !shouldFocusSearchButtonRef.current) return;
    shouldFocusSearchButtonRef.current = false;
    searchButtonRef.current?.focus();
  }, [isSearchOpen]);

  function closeSearch() {
    shouldFocusSearchButtonRef.current = true;
    onSearchClose();
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-col gap-4 border-b border-line p-4">
        <div className="flex min-h-11 items-center justify-between gap-3">
          <Wordmark />
          {headerAction}
        </div>
        {isSearchOpen ? (
          <ConversationSearch
            query={searchQuery}
            onQueryChange={onSearchQueryChange}
            onClose={closeSearch}
          />
        ) : (
          <div className="flex items-center gap-3">
            <IconButton
              ref={searchButtonRef}
              icon="search"
              size="sm"
              label="Buscar conversas"
              onClick={onSearchOpen}
            />
            <Button
              variant="primary"
              size="sm"
              iconLeft="plus"
              onClick={onNewConversation}
              className="flex-1"
            >
              Nova conversa
            </Button>
          </div>
        )}
      </div>

      <h2 className="px-4 pt-4 pb-2 font-mono text-eyebrow text-ink-muted uppercase">Conversas</h2>
      {/* Anuncia para leitores de tela quantas conversas a busca encontrou */}
      <p role="status" className="sr-only">
        {isFiltering ? resultsMessage(conversations.length) : ""}
      </p>
      {isFiltering && conversations.length === 0 ? (
        <p className="px-4 py-2 text-small text-ink-muted">Nenhuma conversa encontrada.</p>
      ) : null}
      <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 pb-4">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            now={now}
            onSelect={onSelect}
            searchTerms={searchTerms}
          />
        ))}
      </ul>
    </div>
  );
}
