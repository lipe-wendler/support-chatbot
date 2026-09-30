// Logo tipográfico da marca: "F.Wendler" em Urbanist Bold e "Support" em Space Mono.
// O design system ainda não tem logo em arquivo, então o nome é o próprio logo.
export function Wordmark() {
  return (
    <p className="flex items-baseline gap-2 text-ink">
      <span className="font-display text-2xl leading-none font-bold tracking-[-0.02em]">
        F.Wendler
      </span>
      <span className="font-mono text-eyebrow text-ink-muted uppercase">Support</span>
    </p>
  );
}
