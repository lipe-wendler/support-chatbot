import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";

// Botão circular só com ícone. O label é obrigatório: vira o nome acessível e a dica.
const SIZE_CLASSES = {
  sm: "size-9",
  md: "size-11",
  lg: "size-14",
} as const;

// No tamanho pequeno o ícone também diminui, para manter a proporção
const ICON_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  icon: IconName;
  label: string;
  size?: keyof typeof SIZE_CLASSES;
}

export function IconButton({
  icon,
  label,
  size = "md",
  className = "",
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex shrink-0 items-center justify-center rounded-pill border border-line-strong bg-transparent text-ink transition-colors duration-150 hover:border-ink ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      <Icon name={icon} size={ICON_SIZES[size]} />
    </button>
  );
}
