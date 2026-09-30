---
name: git-workflow
description: Define o fluxo Git do projeto com Conventional Commits 1.0.0 em português do Brasil. Use ao começar uma tarefa (criar branch), escrever mensagens de commit, abrir ou descrever um Pull Request e fazer o merge, que é sempre squash. Aciona com branch, commit, mensagem de commit, pull request, PR, merge, squash, conventional commits.
---

# Fluxo Git do projeto

Cada tarefa segue sempre o mesmo ciclo:

```
main atualizada -> branch da tarefa -> commits -> push -> Pull Request -> aprovação -> squash merge -> limpeza
```

Regras que nunca mudam:

- Nunca commitar direto na `main`.
- Uma tarefa por branch, um assunto por commit.
- Branch, commits e PR seguem o [Conventional Commits 1.0.0](https://www.conventionalcommits.org/pt-br/v1.0.0/).
- Textos (descrição da branch, commits, título e descrição do PR) em português do Brasil.
- O merge na `main` é sempre **squash merge**. Nada de merge commit nem rebase merge.
- O merge só acontece depois da aprovação de quem pediu a mudança.

Tipos permitidos (valem para branch, commit e título de PR):
`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
O significado de cada um está em [references/conventional-commits.md](references/conventional-commits.md).

## 1. Criar a branch da tarefa

```bash
git switch main
git pull origin main
git switch -c <tipo>/<descricao-curta>
```

- Formato: `<tipo>/<descricao-em-kebab-case>`, com a descrição em português, minúscula, sem acento nem cedilha, até 50 caracteres.
- Exemplos: `feat/filtro-por-categoria`, `fix/rolagem-da-lista-de-conversas`, `docs/guia-de-contribuicao`.
- Valide antes de criar: `bash .claude/skills/git-workflow/scripts/validate.sh branch "<nome>"`.

Detalhes e como atualizar a branch com a `main`: [references/branches.md](references/branches.md).

## 2. Fazer os commits

Formato da mensagem:

```
<tipo>(<escopo opcional>)<! opcional>: <descrição>

<corpo opcional: o que mudou e por quê>

<rodapés opcionais>
```

- Descrição em português, verbo no presente em 3a pessoa (`adiciona`, `corrige`, `remove`), começando em minúscula e sem ponto final.
- Cabeçalho inteiro com no máximo 72 caracteres.
- Escopo em minúsculas, com o nome da área do código (`chat`, `search`, `layout`).
- Corpo e rodapés separados do cabeçalho por uma linha em branco; corpo quebrado em 72 colunas.
- Mudança incompatível: `!` antes dos dois pontos e/ou rodapé `BREAKING CHANGE: <explicação>`.
- Valide o cabeçalho: `bash .claude/skills/git-workflow/scripts/validate.sh commit "<cabeçalho>"`.

Exemplo:

```
feat(search): adiciona busca por data nas conversas

A busca passa a reconhecer datas no formato DD/MM/AAAA e as palavras
"hoje" e "ontem", filtrando as conversas pelo dia da última mensagem.

Refs: #12
```

Para escrever mensagens com várias linhas use um heredoc:

```bash
git commit -F- <<'EOF'
fix(chat): corrige rolagem ao receber nova mensagem

A lista agora rola até o fim só quando o usuário já estava no fim.
EOF
```

Regras completas, rodapés e exemplos certos e errados: [references/conventional-commits.md](references/conventional-commits.md).

## 3. Enviar a branch

```bash
git push -u origin <tipo>/<descricao-curta>
```

## 4. Abrir o Pull Request

- Base: `main`. Head: a branch da tarefa.
- **Título**: mesmo formato de um cabeçalho de commit, descrevendo a mudança inteira. Ele vira a mensagem do commit na `main` depois do squash, então precisa estar correto.
  Valide: `bash .claude/skills/git-workflow/scripts/validate.sh title "<título>"`.
- **Descrição**: preencha as seções de [.github/pull_request_template.md](../../../.github/pull_request_template.md) (Resumo, Mudanças, Como testar, Breaking changes, Issues relacionadas, Checklist).

Como escolher o título e o que escrever em cada seção: [references/pull-requests.md](references/pull-requests.md).

## 5. Fazer o squash merge

Somente depois da aprovação de quem pediu a mudança:

- No GitHub, use **Squash and merge**.
- Mensagem do commit final: título do PR seguido do número, por exemplo `feat(search): adiciona busca por data nas conversas (#7)`, e no corpo o resumo da descrição do PR.
- Pela ferramenta do GitHub: `merge_pull_request` com `merge_method: "squash"` e `commit_title: "<título do PR> (#<número>)"`.

A configuração do repositório que bloqueia merge commit e rebase merge está em [references/pull-requests.md](references/pull-requests.md#configuração-do-repositório-no-github).

## 6. Limpar depois do merge

```bash
git switch main
git pull origin main
git branch -D <tipo>/<descricao-curta>
git push origin --delete <tipo>/<descricao-curta>   # só se o GitHub não apagou sozinho
```

Use `-D` porque, depois do squash, o Git não reconhece a branch como mesclada e `-d` falha.

## Checklist

Copie e marque ao longo da tarefa:

```
- [ ] Branch criada a partir da main atualizada, no formato <tipo>/<descricao>
- [ ] Commits no formato Conventional Commits, em PT-BR, um por assunto
- [ ] npm run build passa
- [ ] Branch enviada com git push -u origin <branch>
- [ ] PR para a main com título validado e descrição pelo template
- [ ] Aprovação de quem pediu a mudança
- [ ] Squash merge com o título do PR (#número)
- [ ] main local atualizada e branch da tarefa apagada
```
