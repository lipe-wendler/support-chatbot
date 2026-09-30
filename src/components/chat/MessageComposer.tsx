"use client";

import { useEffect, useId, useState, type FormEvent, type KeyboardEvent, type RefObject } from "react";
import { Button } from "@/components/ui/Button";

// Altura máxima do campo antes de ganhar rolagem própria
const MAX_TEXTAREA_HEIGHT = 160;

interface MessageComposerProps {
  onSend: (text: string) => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
}

// Campo de mensagem com botão Enviar. Enter envia; Shift+Enter quebra linha.
export function MessageComposer({ onSend, inputRef }: MessageComposerProps) {
  const [text, setText] = useState("");
  const inputId = useId();
  const hintId = useId();
  const canSend = text.trim().length > 0;

  // O campo cresce junto com o texto, até o limite
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [text, inputRef]);

  function send() {
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Durante a composição de acentos (IME), o Enter confirma o caractere e não envia
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-line bg-surface px-4 py-3 md:px-6 md:py-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label htmlFor={inputId} className="sr-only">
            Mensagem
          </label>
          <textarea
            id={inputId}
            ref={inputRef}
            rows={1}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva sua mensagem"
            aria-describedby={hintId}
            className="block min-h-11 w-full resize-none rounded-sm border border-line-strong bg-field px-4 py-[11px] text-small text-ink transition-colors duration-150 placeholder:text-ink-muted hover:border-ink-muted"
          />
          <p id={hintId} className="px-1 text-caption text-ink-muted">
            Enter envia. Shift+Enter quebra a linha.
          </p>
        </div>
        <Button type="submit" icon="arrow-right" disabled={!canSend} className="mb-5">
          Enviar
        </Button>
      </div>
    </form>
  );
}
