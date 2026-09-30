const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const relativeFormatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const clockFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

/**
 * Texto de "há quanto tempo": "agora", "há 5 minutos", "há 3 horas".
 * A partir de 24 horas mostra a data no formato DD/MM/AAAA.
 */
export function formatRelativeTime(timestamp: number, now: number): string {
  const elapsed = Math.max(0, now - timestamp);

  if (elapsed < MINUTE) return "agora";
  if (elapsed < HOUR) return relativeFormatter.format(-Math.floor(elapsed / MINUTE), "minute");
  if (elapsed < DAY) return relativeFormatter.format(-Math.floor(elapsed / HOUR), "hour");
  return dateFormatter.format(timestamp);
}

/** Data no formato DD/MM/AAAA. */
export function formatDate(timestamp: number): string {
  return dateFormatter.format(timestamp);
}

/** Horário no formato 14:05. */
export function formatClockTime(timestamp: number): string {
  return clockFormatter.format(timestamp);
}
