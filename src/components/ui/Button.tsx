import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

// Botão pílula do design system. "primary" (amarelo) no máximo uma vez por bloco.
const VARIANT_CLASSES = {
  primary:
    "border-transparent bg-accent text-on-accent enabled:hover:bg-accent-hover enabled:hover:shadow-[var(--shadow-glow)]",
  secondary: "border-line-strong text-ink enabled:hover:border-ink",
  outline: "border-accent text-ink enabled:hover:bg-accent-soft",
  ghost: "border-transparent text-ink enabled:hover:bg-surface-raised",
} as const;

const SIZE_CLASSES = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-label",
  lg: "h-14 px-8 text-base",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
  /** Ícone antes do rótulo */
  iconLeft?: IconName;
  /** Ícone depois do rótulo */
  icon?: IconName;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  icon,
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill border font-semibold transition-[background-color,border-color,box-shadow] duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-45 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {iconLeft ? <Icon name={iconLeft} className="size-[18px]" /> : null}
      {children}
      {icon ? <Icon name={icon} className="size-[18px]" /> : null}
    </button>
  );
}
