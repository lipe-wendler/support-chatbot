import type { Category } from "./types";

interface CategoryStyle {
  /** Nome exibido na tela */
  label: string;
  /** Classes do Tailwind com as cores da etiqueta (tokens cat-* do globals.css) */
  className: string;
}

// As classes ficam escritas por extenso para o Tailwind encontrá-las no build
export const CATEGORIES: Record<Category, CategoryStyle> = {
  acesso: { label: "Acesso", className: "bg-cat-acesso-bg text-cat-acesso-fg" },
  dados: { label: "Dados", className: "bg-cat-dados-bg text-cat-dados-fg" },
  integracao: { label: "Integração", className: "bg-cat-integracao-bg text-cat-integracao-fg" },
  duvida: { label: "Dúvida", className: "bg-cat-duvida-bg text-cat-duvida-fg" },
  bug: { label: "Bug", className: "bg-cat-bug-bg text-cat-bug-fg" },
  feature: { label: "Feature", className: "bg-cat-feature-bg text-cat-feature-fg" },
};
