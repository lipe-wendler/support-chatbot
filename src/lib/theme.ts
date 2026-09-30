export type Theme = "dark" | "light";

// Chave onde a escolha de tema fica salva no navegador
export const THEME_STORAGE_KEY = "fwendler-theme";

const LIGHT_MEDIA_QUERY = "(prefers-color-scheme: light)";

function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/** Tema escolhido pela pessoa, ou null se ela ainda não escolheu (ou o navegador bloqueia o armazenamento). */
export function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sem armazenamento (ex.: janela privada): o tema vale só até recarregar
  }
}

/** Tema do sistema operacional da pessoa. */
export function getSystemTheme(): Theme {
  return window.matchMedia(LIGHT_MEDIA_QUERY).matches ? "light" : "dark";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

/** Observa mudanças no tema do sistema; devolve a função que para de observar. */
export function watchSystemTheme(onChange: (theme: Theme) => void): () => void {
  const query = window.matchMedia(LIGHT_MEDIA_QUERY);
  const listener = (event: MediaQueryListEvent) => onChange(event.matches ? "light" : "dark");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

/**
 * Script que roda no <head> antes da página aparecer, para não piscar o tema errado.
 * Usa a escolha salva; sem escolha, segue o sistema.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="dark"&&t!=="light"){t=window.matchMedia("${LIGHT_MEDIA_QUERY}").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;
