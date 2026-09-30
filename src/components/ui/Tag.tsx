import type { ReactNode } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { Category } from "@/lib/types";

// Pílula do design system. Com "category", ganha a cor da categoria;
// o nome da categoria sempre aparece escrito, então a cor nunca é o único sinal.
interface TagProps {
  size?: "sm" | "md";
  category?: Category;
  /** Texto da etiqueta; com "category" e sem children, usa o nome da categoria */
  children?: ReactNode;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "h-6 px-3 text-xs",
  md: "h-8 px-4 text-[13px]",
} as const;

export function Tag({ size = "md", category, children, className = "" }: TagProps) {
  const colorClasses = category
    ? `border-transparent ${CATEGORIES[category].className}`
    : "border-line-strong text-ink";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-pill border font-medium leading-none ${SIZE_CLASSES[size]} ${colorClasses} ${className}`}
    >
      {children ?? (category ? CATEGORIES[category].label : null)}
    </span>
  );
}
