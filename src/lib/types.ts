// Categorias de chamado, com os mesmos valores usados pela API do TimeTrack
export type Category = "acesso" | "dados" | "integracao" | "duvida" | "bug" | "feature";

// "user" é quem pede suporte; "assistant" é o atendente (o chatbot)
export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  /** Momento do envio, em milissegundos desde 1970 (Date.now()) */
  createdAt: number;
}

export interface Conversation {
  id: string;
  title: string;
  customerName: string;
  customerEmail?: string;
  /** Sem categoria enquanto a conversa ainda não foi classificada */
  category?: Category;
  messages: Message[];
  /** Momento da última atividade, usado para ordenar a lista */
  updatedAt: number;
}
