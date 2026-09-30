"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  customerName: string;
  now: number | null;
}

// Lista de mensagens. O role="log" faz o leitor de tela anunciar as mensagens novas.
// A área rolável recebe foco pelo teclado para dar para rolar com as setas.
export function MessageList({ messages, customerName, now }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mantém a última mensagem visível sempre que chega uma nova
  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages.length]);

  return (
    <div
      ref={scrollRef}
      role="log"
      aria-label="Mensagens da conversa"
      tabIndex={0}
      className="min-h-0 flex-1 overflow-y-auto focus-visible:outline-offset-[-2px]"
    >
      <ol className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6 md:px-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} customerName={customerName} now={now} />
        ))}
      </ol>
    </div>
  );
}
