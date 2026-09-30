"use client";

import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";

interface ConversationSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
}

// Campo de busca de conversas. Aparece ao clicar na lupa e filtra a lista enquanto a pessoa digita,
// procurando no assunto, no tipo de solicitação, nas datas e no texto das mensagens.
// Esc ou o botão de fechar encerram a busca.
export function ConversationSearch({ query, onQueryChange, onClose }: ConversationSearchProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // Ao abrir, o foco vai direto para o campo
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  }

  return (
    <div role="search" className="relative flex items-center">
      <label htmlFor={inputId} className="sr-only">
        Buscar conversas
      </label>
      <Icon name="search" size="sm" className="pointer-events-none absolute left-3 text-ink-muted" />
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Assunto, tipo, data ou texto"
        autoComplete="off"
        className="h-9 w-full rounded-sm border border-line-strong bg-field pr-10 pl-9 text-small text-ink transition-colors duration-150 placeholder:text-ink-muted hover:border-ink-muted [&::-webkit-search-cancel-button]:appearance-none"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar busca"
        title="Fechar busca"
        className="absolute right-1 inline-flex size-7 items-center justify-center rounded-pill text-ink-muted transition-colors duration-150 hover:bg-surface-raised hover:text-ink"
      >
        <Icon name="close" size="sm" />
      </button>
    </div>
  );
}
