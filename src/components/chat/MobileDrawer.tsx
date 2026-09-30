"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

interface MobileDrawerProps {
  id: string;
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}

// Gaveta lateral do celular. Usa o <dialog> nativo em modo modal, que já prende o foco,
// fecha com Esc e devolve o foco ao botão que abriu.
export function MobileDrawer({ id, open, onClose, label, children }: MobileDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sincroniza o estado do React com o dialog do navegador
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Clique no fundo escurecido (fora do painel) fecha a gaveta
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-label={label}
      onClose={onClose}
      onClick={handleClick}
      className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(85vw,20rem)] max-w-none border-r border-line bg-surface p-0 text-ink shadow-[var(--shadow-pop)] backdrop:bg-black/60"
    >
      {children}
    </dialog>
  );
}
