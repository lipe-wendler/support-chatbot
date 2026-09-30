import { CATEGORIES } from "./categories";
import { formatDate } from "./format-relative-time";
import { normalizeText } from "./normalize-text";
import type { Conversation, Message } from "./types";

const DAY = 24 * 60 * 60 * 1000;

/** Quebra a busca em termos normalizados: "Acesso 30/09" vira ["acesso", "30/09"]. */
export function toSearchTerms(query: string): string[] {
  return normalizeText(query).split(/\s+/).filter(Boolean);
}

// Palavras de data relativa, para buscar "hoje" ou "ontem"
function relativeDayWords(timestamp: number, now: number | null): string[] {
  if (now === null) return [];
  const startOfToday = new Date(now).setHours(0, 0, 0, 0);
  if (timestamp >= startOfToday) return ["hoje"];
  if (timestamp >= startOfToday - DAY) return ["ontem"];
  return [];
}

/**
 * Junta tudo o que pode ser buscado numa conversa: assunto, tipo de solicitação,
 * datas (DD/MM/AAAA, "hoje", "ontem") e o conteúdo das mensagens.
 */
function searchableText(conversation: Conversation, now: number | null): string {
  const category = conversation.category
    ? [conversation.category, CATEGORIES[conversation.category].label]
    : [];
  const timestamps = [conversation.updatedAt, ...conversation.messages.map((m) => m.createdAt)];
  const dates = timestamps.flatMap((t) => [formatDate(t), ...relativeDayWords(t, now)]);
  const contents = conversation.messages.map((message) => message.content);

  return normalizeText([conversation.title, ...category, ...dates, ...contents].join(" \n "));
}

/** A conversa aparece se TODOS os termos estiverem em algum dos campos pesquisáveis. */
export function matchesSearch(
  conversation: Conversation,
  terms: string[],
  now: number | null,
): boolean {
  if (terms.length === 0) return true;
  const text = searchableText(conversation, now);
  return terms.every((term) => text.includes(term));
}

/**
 * Mensagem que melhor combina com a busca, para mostrar na prévia da lista:
 * a que contém mais termos e, no empate, a mais recente.
 * Sem termos ou sem mensagem compatível, devolve undefined.
 */
export function findMatchingMessage(
  conversation: Conversation,
  terms: string[],
): Message | undefined {
  let best: Message | undefined;
  let bestScore = 0;

  for (const message of conversation.messages) {
    const content = normalizeText(message.content);
    const score = terms.filter((term) => content.includes(term)).length;
    // ">=" faz a mensagem mais recente vencer o empate
    if (score > 0 && score >= bestScore) {
      best = message;
      bestScore = score;
    }
  }

  return best;
}
