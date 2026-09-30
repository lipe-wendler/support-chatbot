import type { Category, Conversation, Message, MessageRole } from "./types";

// Conversas fictícias para a tela. Pessoas e emails vêm dos usuários de teste
// do TimeTrack (docs/timetrack-api.md, seção 7).

interface SampleMessage {
  role: MessageRole;
  content: string;
  /** Há quantos minutos a mensagem foi enviada */
  minutesAgo: number;
}

interface SampleConversation {
  id: string;
  title: string;
  customerName: string;
  customerEmail: string;
  category: Category;
  messages: SampleMessage[];
}

const SAMPLE_CONVERSATIONS: SampleConversation[] = [
  {
    id: "exemplo-joao-silva",
    title: "Conta bloqueada após tentativas de senha",
    customerName: "João Silva",
    customerEmail: "joao.silva@acme.com.br",
    category: "acesso",
    messages: [
      {
        role: "user",
        content: "Oi, não consigo entrar no TimeTrack. Aparece que minha conta está bloqueada.",
        minutesAgo: 6,
      },
      {
        role: "assistant",
        content:
          "Olá, João. Verifiquei aqui: sua conta foi bloqueada depois de 5 tentativas de senha incorreta. Posso enviar um email para você redefinir a senha?",
        minutesAgo: 5,
      },
      { role: "user", content: "Pode sim, por favor.", minutesAgo: 4 },
    ],
  },
  {
    id: "exemplo-maria-costa",
    title: "Horas duplicadas no relatório",
    customerName: "Maria Costa",
    customerEmail: "maria.costa@techcorp.com",
    category: "dados",
    messages: [
      {
        role: "user",
        content: "As horas do dia 12 aparecem duplicadas no meu relatório de setembro.",
        minutesAgo: 41,
      },
      {
        role: "assistant",
        content:
          "Entendi, Maria. Vou registrar um chamado para a equipe revisar os registros do dia 12. Você bateu o ponto pelo app ou pelo navegador?",
        minutesAgo: 40,
      },
      { role: "user", content: "Pelo app do celular.", minutesAgo: 38 },
    ],
  },
  {
    id: "exemplo-carlos-mendes",
    title: "Exportação para a folha de pagamento",
    customerName: "Carlos Mendes",
    customerEmail: "carlos.mendes@manufaturaltd.com.br",
    category: "integracao",
    messages: [
      {
        role: "user",
        content: "A exportação para o sistema da folha de pagamento parou de funcionar ontem.",
        minutesAgo: 182,
      },
      {
        role: "assistant",
        content: "Obrigado por avisar, Carlos. Apareceu alguma mensagem de erro na exportação?",
        minutesAgo: 180,
      },
    ],
  },
  {
    id: "exemplo-ana-ribeiro",
    title: "Cadastro de feriados municipais",
    customerName: "Ana Ribeiro",
    customerEmail: "ana.ribeiro@pequenosnegocios.com.br",
    category: "duvida",
    messages: [
      {
        role: "user",
        content: "Como faço para cadastrar os feriados municipais?",
        minutesAgo: 1565,
      },
      {
        role: "assistant",
        content:
          "Oi, Ana. Em Configurações, abra Calendário e clique em Adicionar feriado. Quer que eu explique como aplicar o feriado a uma equipe específica?",
        minutesAgo: 1562,
      },
      { role: "user", content: "Quero, obrigada.", minutesAgo: 1560 },
    ],
  },
  {
    id: "exemplo-marina-costa",
    title: "App fecha ao registrar ponto",
    customerName: "Marina Costa",
    customerEmail: "marina@empresa.com",
    category: "bug",
    messages: [
      {
        role: "user",
        content: "O app fecha sozinho quando toco em Registrar ponto.",
        minutesAgo: 2905,
      },
      {
        role: "assistant",
        content:
          "Sinto muito pelo transtorno, Marina. Abri o chamado TT-2026-001523 para a equipe técnica. Qual é o modelo do seu celular?",
        minutesAgo: 2900,
      },
    ],
  },
  {
    id: "exemplo-rafael-souza",
    title: "Sugestão de aviso de hora extra",
    customerName: "Rafael Souza",
    customerEmail: "rafael.souza@logistica-sul.com.br",
    category: "feature",
    messages: [
      {
        role: "user",
        content: "Seria ótimo receber um aviso quando alguém da equipe passar de 8 horas no dia.",
        minutesAgo: 7210,
      },
      {
        role: "assistant",
        content: "Ótima ideia, Rafael. Registrei sua sugestão para o time de produto avaliar.",
        minutesAgo: 7200,
      },
    ],
  },
];

/**
 * Monta as conversas de exemplo com horários relativos a `now`,
 * para que "há quanto tempo" faça sentido em qualquer dia.
 */
export function createSampleConversations(now: number): Conversation[] {
  return SAMPLE_CONVERSATIONS.map((sample) => {
    const messages: Message[] = sample.messages.map((message, index) => ({
      id: `${sample.id}-${index}`,
      role: message.role,
      content: message.content,
      createdAt: now - message.minutesAgo * 60 * 1000,
    }));

    return {
      id: sample.id,
      title: sample.title,
      customerName: sample.customerName,
      customerEmail: sample.customerEmail,
      category: sample.category,
      messages,
      updatedAt: messages[messages.length - 1].createdAt,
    };
  });
}
