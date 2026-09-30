"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  getSystemTheme,
  readStoredTheme,
  storeTheme,
  watchSystemTheme,
  type Theme,
} from "@/lib/theme";
import { IconButton } from "./IconButton";

// Botão que alterna entre tema escuro e claro.
// Enquanto a pessoa não escolhe, o tema acompanha o sistema; depois, a escolha fica salva.
export function ThemeToggle() {
  // null até montar no navegador: o tema real só é conhecido lá
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" || current === "dark" ? current : getSystemTheme());

    // Sem escolha salva, segue as mudanças de tema do sistema
    return watchSystemTheme((systemTheme) => {
      if (readStoredTheme() !== null) return;
      applyTheme(systemTheme);
      setTheme(systemTheme);
    });
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    storeTheme(next);
    setTheme(next);
  }

  const isLight = theme === "light";

  return (
    <IconButton
      icon={isLight ? "moon" : "sun"}
      size="sm"
      label={isLight ? "Ativar tema escuro" : "Ativar tema claro"}
      onClick={toggleTheme}
      disabled={theme === null}
    />
  );
}
