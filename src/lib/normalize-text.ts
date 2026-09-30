/**
 * Deixa o texto pronto para comparação: minúsculo, sem acentos e sem espaços nas pontas.
 * Assim "Relatório" e "relatorio" são considerados iguais.
 */
export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
