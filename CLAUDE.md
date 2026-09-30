# CLAUDE.md

## Sobre o projeto

Chatbot de suporte do TimeTrack, um sistema fictício de controle de ponto.
Projeto feito no curso Desenvolvimento Web com Claude.

O repositório é público: escreva o código pensando que outras pessoas vão ler,
entender e complementar o sistema. Prefira nomes claros, funções pequenas e
estrutura previsível.

## Stack

- Next.js 15 com App Router (código em `src/app`).
- TypeScript estrito (`strict: true`). Proibido usar `any`; quando o tipo for
  desconhecido, use `unknown` e faça a validação.
- Tailwind CSS puro. Não usar bibliotecas de componentes (shadcn/ui, MUI, Chakra etc.).

## Idiomas

- Textos exibidos na tela: português do Brasil.
- Código (variáveis, funções, tipos, arquivos): inglês.
- Comentários no código: português.

## Frontend

- Nunca usar emojis nos textos da interface.
- Nunca usar travessões (— ou –) nos textos da interface.

## TimeTrack e Claude

- O TimeTrack é um sistema EXTERNO, documentado em `docs/timetrack-api.md`.
- Sempre leia `docs/timetrack-api.md` antes de programar qualquer coisa ligada
  ao TimeTrack ou ao Claude.

## Segurança

- Nunca colocar chaves, senhas ou tokens no código. Use variáveis de ambiente
  (`.env.local`, que não vai para o Git).

## Fluxo de Git

- Nunca commitar direto na `main`. Cada alteração é feita numa branch própria,
  criada a partir da `main` atualizada.
- Nome da branch: `tipo/descricao-curta-em-ingles`, com os tipos do Conventional
  Commits (`feat`, `fix`, `style`, `refactor`, `docs`, `chore`, `test`).
  Ex.: `feat/conversation-search`.
- Commits no formato Conventional Commits (`tipo(escopo): descrição`), um por assunto.
- Ordem: branch, commits, preview e testes, Pull Request para a `main`, merge só
  depois da aprovação de quem pediu a mudança.

## Comandos

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: build de produção (também faz a checagem de tipos).
