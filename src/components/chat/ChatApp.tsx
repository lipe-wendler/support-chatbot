"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { createSampleConversations } from "@/lib/conversas-exemplo";
import { createId } from "@/lib/create-id";
import { normalizeText } from "@/lib/normalize-text";
import type { Conversation, Message, MessageRole } from "@/lib/types";
import { useNow } from "@/lib/use-now";
import { ChatHeader } from "./ChatHeader";
import { ConversationSidebar } from "./ConversationSidebar";
import { EmptyState } from "./EmptyState";
import { MessageComposer } from "./MessageComposer";
import { MessageList } from "./MessageList";
import { MobileDrawer } from "./MobileDrawer";

// Enquanto não há IA, o atendente responde sempre esta frase
const PLACEHOLDER_REPLY = "Ainda estou aprendendo a responder. No Dia 4 eu ganho um cérebro!";
const REPLY_DELAY_MS = 500;

const NEW_CONVERSATION_TITLE = "Nova conversa";
const TITLE_MAX_LENGTH = 60;
const DRAWER_ID = "gaveta-conversas";
// A partir desta largura a lista fica fixa na tela (breakpoint md do Tailwind)
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

function createMessage(role: MessageRole, content: string): Message {
  return { id: createId("msg"), role, content, createdAt: Date.now() };
}

function createEmptyConversation(): Conversation {
  return {
    id: createId("conversa"),
    title: NEW_CONVERSATION_TITLE,
    customerName: "Visitante",
    messages: [],
    updatedAt: Date.now(),
  };
}

// Título de uma conversa nova: o começo da primeira mensagem
function titleFromMessage(text: string): string {
  const singleLine = text.replace(/\s+/g, " ").trim();
  return singleLine.length > TITLE_MAX_LENGTH
    ? `${singleLine.slice(0, TITLE_MAX_LENGTH).trimEnd()}...`
    : singleLine;
}

// Acrescenta uma mensagem e leva a conversa para o topo da lista
function appendMessage(
  conversations: Conversation[],
  conversationId: string,
  message: Message,
): Conversation[] {
  const target = conversations.find((conversation) => conversation.id === conversationId);
  if (!target) return conversations;

  const isFirstMessage = target.messages.length === 0;
  const updated: Conversation = {
    ...target,
    title: isFirstMessage && message.role === "user" ? titleFromMessage(message.content) : target.title,
    messages: [...target.messages, message],
    updatedAt: message.createdAt,
  };

  return [updated, ...conversations.filter((conversation) => conversation.id !== conversationId)];
}

// Tela principal do chatbot: lista de conversas, conversa aberta e campo de envio
export function ChatApp() {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    createSampleConversations(Date.now()),
  );
  const [activeConversationId, setActiveConversationId] = useState<string>(
    () => conversations[0]?.id ?? "",
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const now = useNow();

  const composerRef = useRef<HTMLTextAreaElement>(null);
  const replyTimersRef = useRef<number[]>([]);
  const shouldFocusComposerRef = useRef(false);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ??
    conversations[0];

  // Busca pelo título, sem diferenciar maiúsculas e acentos
  const normalizedQuery = isSearchOpen ? normalizeText(searchQuery) : "";
  const visibleConversations = normalizedQuery
    ? conversations.filter((conversation) =>
        normalizeText(conversation.title).includes(normalizedQuery),
      )
    : conversations;

  // Cancela respostas pendentes se a tela for desmontada
  useEffect(() => {
    const timersRef = replyTimersRef;
    return () => timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  // Se a tela crescer para o tamanho de desktop com a gaveta aberta, fecha a gaveta
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsDrawerOpen(false);
    };
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);

  // Leva o foco ao campo de mensagem quando pedido (depois que a gaveta fecha)
  useEffect(() => {
    if (!shouldFocusComposerRef.current) return;
    shouldFocusComposerRef.current = false;
    composerRef.current?.focus();
  });

  const sendMessage = useCallback(
    (text: string) => {
      if (!activeConversation) return;
      const conversationId = activeConversation.id;

      setConversations((current) =>
        appendMessage(current, conversationId, createMessage("user", text)),
      );
      shouldFocusComposerRef.current = true;

      const timer = window.setTimeout(() => {
        setConversations((current) =>
          appendMessage(current, conversationId, createMessage("assistant", PLACEHOLDER_REPLY)),
        );
        replyTimersRef.current = replyTimersRef.current.filter((id) => id !== timer);
      }, REPLY_DELAY_MS);
      replyTimersRef.current.push(timer);
    },
    [activeConversation],
  );

  function selectConversation(conversationId: string) {
    setActiveConversationId(conversationId);
    setIsDrawerOpen(false);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchQuery("");
  }

  function startNewConversation() {
    const conversation = createEmptyConversation();
    // A conversa nova sempre aparece na lista, então a busca é encerrada
    closeSearch();
    setConversations((current) => [conversation, ...current]);
    setActiveConversationId(conversation.id);
    setIsDrawerOpen(false);
    shouldFocusComposerRef.current = true;
  }

  const sidebarProps = {
    conversations: visibleConversations,
    activeConversationId: activeConversation?.id ?? "",
    now,
    onSelect: selectConversation,
    onNewConversation: startNewConversation,
    isSearchOpen,
    searchQuery,
    onSearchOpen: () => setIsSearchOpen(true),
    onSearchQueryChange: setSearchQuery,
    onSearchClose: closeSearch,
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-bg text-ink">
      <a
        href="#conversa"
        className="sr-only rounded-pill bg-accent px-4 py-2 text-label text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Pular para a conversa
      </a>

      <aside
        aria-label="Conversas"
        className="hidden w-80 shrink-0 border-r border-line bg-surface md:flex md:flex-col"
      >
        <ConversationSidebar {...sidebarProps} />
      </aside>

      <MobileDrawer
        id={DRAWER_ID}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        label="Conversas"
      >
        <ConversationSidebar
          {...sidebarProps}
          headerAction={
            <IconButton
              icon="close"
              size="sm"
              label="Fechar lista de conversas"
              onClick={() => setIsDrawerOpen(false)}
            />
          }
        />
      </MobileDrawer>

      <main id="conversa" tabIndex={-1} className="flex min-w-0 flex-1 flex-col outline-none">
        <h1 className="sr-only">F.Wendler Support</h1>
        {activeConversation ? (
          <>
            <ChatHeader
              conversation={activeConversation}
              drawerId={DRAWER_ID}
              isDrawerOpen={isDrawerOpen}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
            {activeConversation.messages.length > 0 ? (
              <MessageList
                key={`mensagens-${activeConversation.id}`}
                messages={activeConversation.messages}
                customerName={activeConversation.customerName}
                now={now}
              />
            ) : (
              <EmptyState onSuggestion={sendMessage} />
            )}
            <MessageComposer
              key={`campo-${activeConversation.id}`}
              onSend={sendMessage}
              inputRef={composerRef}
            />
          </>
        ) : null}
      </main>
    </div>
  );
}
