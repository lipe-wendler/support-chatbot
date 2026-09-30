const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const relativeFormatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });
const clockFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

/** Texto curto de "há quanto tempo": "agora", "há 5 minutos", "ontem", "há 3 dias", "12/09". */
export function formatRelativeTime(timestamp: number, now: number): string {
  const elapsed = Math.max(0, now - timestamp);

  if (elapsed < MINUTE) return "agora";
  if (elapsed < HOUR) return relativeFormatter.format(-Math.floor(elapsed / MINUTE), "minute");
  if (elapsed < DAY) return relativeFormatter.format(-Math.floor(elapsed / HOUR), "hour");
  if (elapsed < 7 * DAY) return relativeFormatter.format(-Math.floor(elapsed / DAY), "day");
  return dateFormatter.format(timestamp);
}

/** Horário no formato 14:05. */
export function formatClockTime(timestamp: number): string {
  return clockFormatter.format(timestamp);
}
