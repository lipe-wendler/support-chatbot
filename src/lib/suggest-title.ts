import { normalizeText } from "./normalize-text";

// Assunto usado quando nenhuma regra reconhece a mensagem
export const DEFAULT_TITLE = "Solicitação de suporte";

interface TitleRule {
  title: string;
  /** A regra vale se a mensagem tiver qualquer um destes trechos (sem acento, minúsculo) */
  keywords: string[];
  /** Se informado, a mensagem também precisa ter algum destes trechos */
  alsoRequires?: string[];
}

// A ordem importa: a primeira regra que combinar define o assunto
const TITLE_RULES: TitleRule[] = [
  { title: "Relatório de horas", keywords: ["relatorio"], alsoRequires: ["hora"] },
  { title: "Solicitação de relatório", keywords: ["relatorio"] },
  {
    title: "Problema de acesso",
    keywords: ["logar", "login", "senha", "bloquead", "acesso", "acessar", "entrar"],
  },
  {
    title: "Status do sistema",
    keywords: ["fora do ar", "caiu", "lento", "instavel", "indisponivel"],
  },
  {
    title: "Integração com outros sistemas",
    keywords: ["integracao", "integrar", "exportacao", "exportar", "folha de pagamento"],
  },
  { title: "Erro no sistema", keywords: ["erro", "bug", "fecha sozinho", "travando", "trava"] },
  { title: "Dúvida de uso", keywords: ["duvida", "como faco", "como configurar"] },
  { title: "Assunto fora do suporte", keywords: ["eleicao", "politica", "futebol"] },
];

/**
 * Sugere o assunto de uma conversa a partir da primeira mensagem, por palavras-chave.
 * É o "bot" nomeando a conversa enquanto ainda não há IA; no Dia 4 a IA substitui esta função.
 */
export function suggestConversationTitle(message: string): string {
  const text = normalizeText(message);
  const hasAny = (terms: string[]) => terms.some((term) => text.includes(term));

  const rule = TITLE_RULES.find(
    ({ keywords, alsoRequires }) => hasAny(keywords) && (!alsoRequires || hasAny(alsoRequires)),
  );
  return rule?.title ?? DEFAULT_TITLE;
}
