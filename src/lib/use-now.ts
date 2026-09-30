"use client";

import { useEffect, useState } from "react";

/**
 * Hora atual, atualizada a cada minuto.
 * Começa como null e só recebe valor no navegador: assim o HTML gerado no servidor
 * e o do navegador ficam iguais, e textos como "há 5 minutos" aparecem depois de montar.
 */
export function useNow(intervalMs = 60 * 1000): number | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return now;
}
