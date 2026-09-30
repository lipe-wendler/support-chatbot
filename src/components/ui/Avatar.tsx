// Círculo com a inicial de quem enviou a mensagem, no lugar de uma foto.
// É decorativo: o autor já é anunciado no texto da mensagem para leitores de tela.
const TONE_CLASSES = {
  neutral: "border-line-strong bg-surface-raised text-ink",
  accent: "border-accent bg-accent-soft text-accent-text",
} as const;

interface AvatarProps {
  initial: string;
  tone?: keyof typeof TONE_CLASSES;
}

export function Avatar({ initial, tone = "neutral" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-pill border font-display text-sm leading-none font-bold select-none ${TONE_CLASSES[tone]}`}
    >
      {initial}
    </span>
  );
}
