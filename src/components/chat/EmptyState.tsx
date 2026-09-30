// Frases de exemplo que aparecem na conversa vazia
const SUGGESTIONS = [
  "Não consigo logar no TimeTrack, meu email é joao@empresa.com",
  "Preciso de um relatório de horas do mês passado",
  "O sistema está fora do ar?",
  "Você sabe quem ganhou a eleição?",
];

interface EmptyStateProps {
  onSuggestion: (text: string) => void;
}

// Tela da conversa sem mensagens: pergunta de abertura e sugestões clicáveis.
// As sugestões são frases longas, por isso usam cantos de card (radius-md) em vez de pílula.
export function EmptyState({ onSuggestion }: EmptyStateProps) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-8">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        <h3 className="text-center font-display text-h3">Como posso ajudar?</h3>
        <ul aria-label="Sugestões de mensagem" className="grid w-full gap-3 sm:grid-cols-2">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion} className="flex">
              <button
                type="button"
                onClick={() => onSuggestion(suggestion)}
                className="w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-left text-small text-ink transition-colors duration-150 hover:border-ink hover:bg-surface-raised"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
