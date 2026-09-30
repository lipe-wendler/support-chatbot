// Ícones de traço do design system F.Wendler: grade 24x24, linha 1.6, pontas arredondadas.
// Herdam a cor do texto (currentColor). "plus" e "moon" seguem o mesmo desenho, no estilo Lucide.
const ICON_PATHS = {
  "arrow-right": ["M5 12h14", "M13 6l6 6-6 6"],
  alert: ["M12 3.5l9 16H3z", "M12 10v4", "M12 17h.01"],
  close: ["M6 6l12 12M18 6L6 18"],
  menu: ["M4 7h16M4 12h16M4 17h16"],
  moon: ["M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"],
  plus: ["M12 5v14", "M5 12h14"],
  sun: [
    "M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4",
  ],
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
