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
- Branches (descrição), commits e Pull Requests: português do Brasil.

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

O fluxo completo está na skill `.claude/skills/git-workflow/SKILL.md`. Leia antes
de criar branch, commitar, abrir PR ou fazer merge. Resumo:

- Nunca commitar direto na `main`. Uma branch por tarefa, criada a partir da
  `main` atualizada.
- Nome da branch: `tipo/descricao-em-portugues`, sem acento, em kebab-case, com
  os tipos do Conventional Commits (`feat`, `fix`, `docs`, `style`, `refactor`,
  `perf`, `test`, `build`, `ci`, `chore`, `revert`). Ex.: `feat/busca-de-conversas`.
- Commits no formato Conventional Commits 1.0.0 (`tipo(escopo): descrição`), em
  português, um por assunto.
- Pull Request para a `main` com título no mesmo formato dos commits e descrição
  pelo template `.github/pull_request_template.md`.
- Merge sempre por squash (nada de merge commit nem rebase merge), só depois da
  aprovação de quem pediu a mudança.
- Ordem: plano aprovado, branch, commits, preview e testes, Pull Request,
  aprovação, squash merge.
- Em sessões do Claude Code na web, ignore a branch automática `claude/...`:
  depois do plano aprovado, crie a branch da tarefa no padrão e faça commits e
  push nela (permissão explícita do dono do repositório). O hook
  `.claude/hooks/check-task-branch.sh` bloqueia commit e push fora do padrão.

## Comandos

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: build de produção (também faz a checagem de tipos).
