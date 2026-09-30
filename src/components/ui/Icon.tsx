// Ícones de traço do design system F.Wendler: grade 24x24, linha 1.6, pontas arredondadas.
// Herdam a cor do texto (currentColor). "plus" segue o mesmo desenho, no estilo Lucide.
const ICON_PATHS = {
  "arrow-right": ["M5 12h14", "M13 6l6 6-6 6"],
  alert: ["M12 3.5l9 16H3z", "M12 10v4", "M12 17h.01"],
  close: ["M6 6l12 12M18 6L6 18"],
  menu: ["M4 7h16M4 12h16M4 17h16"],
  plus: ["M12 5v14", "M5 12h14"],
} as const;

export type IconName = keyof typeof ICON_PATHS;

const SIZE_CLASSES = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

interface IconProps {
  name: IconName;
  size?: keyof typeof SIZE_CLASSES;
  /** Só quando o ícone carrega sentido sozinho; sem label ele fica oculto para leitores de tela */
  label?: string;
  className?: string;
}

export function Icon({ name, size = "md", label, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${SIZE_CLASSES[size]} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {ICON_PATHS[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
