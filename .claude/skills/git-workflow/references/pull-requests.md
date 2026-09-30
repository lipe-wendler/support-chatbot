# Pull Requests e squash merge

## Sumário

- [Título](#título)
- [Descrição](#descrição)
- [Revisão e aprovação](#revisão-e-aprovação)
- [Squash merge](#squash-merge)
- [Configuração do repositório no GitHub](#configuração-do-repositório-no-github)

## Título

O título do PR vira a mensagem do commit na `main` depois do squash. Por isso ele segue exatamente o formato do cabeçalho de commit:

```
<tipo>[(escopo)][!]: <descrição>
```

- Descreve a mudança inteira, não o último commit.
- Quando a branch tem commits de tipos diferentes, use o tipo da mudança mais relevante para quem usa o sistema (`feat` > `fix` > os demais).
- Se algum commit tem `!` ou `BREAKING CHANGE`, o título também leva `!`.
- Em português, até 72 caracteres, mesmas regras de [conventional-commits.md](conventional-commits.md#descrição).
- Valide: `bash .claude/skills/git-workflow/scripts/validate.sh title "<título>"`.

Exemplo: branch `feat/busca-por-data` com os commits `feat(search): adiciona busca por data` e `style(search): ajusta placeholder do campo` gera o título `feat(search): adiciona busca por data nas conversas`.

## Descrição

Siga o template em `.github/pull_request_template.md`, que o GitHub preenche sozinho ao abrir o PR pela interface. Ao abrir o PR por ferramenta ou linha de comando, copie as seções do template no corpo.

| Seção                   | O que escrever                                                                 |
|-------------------------|--------------------------------------------------------------------------------|
| `## Resumo`             | Um parágrafo: o que muda e por quê, do ponto de vista de quem usa o sistema    |
| `## Mudanças`           | Lista das alterações principais, uma por item                                  |
| `## Como testar`        | Passos numerados para ver a mudança funcionando no preview ou no `npm run dev` |
| `## Breaking changes`   | O que quebra e como adaptar, ou "Nenhuma"                                     |
| `## Issues relacionadas`| `Closes #n` para fechar, `Refs: #n` para só citar, ou "Nenhuma"               |
| `## Checklist`          | Marque cada item verificado                                                    |

Tudo em português do Brasil, sem emojis e sem travessões.

## Revisão e aprovação

- Antes de pedir revisão: `npm run build` passando e a mudança testada no preview.
- Ajustes pedidos na revisão entram como novos commits na mesma branch, também no padrão. Não reescreva o histórico da branch (sem `rebase` nem `push --force`); o squash cuida de deixar a `main` limpa.
- O merge só acontece depois da aprovação de quem pediu a mudança.

## Squash merge

É o único método de merge permitido. Todos os commits da branch viram um só commit na `main`.

- No GitHub: botão **Squash and merge**.
- Título do commit final: título do PR com o número no fim, por exemplo `feat(search): adiciona busca por data nas conversas (#7)`.
- Corpo do commit final: o resumo do PR. Mantenha os rodapés relevantes (`Closes #n`, `BREAKING CHANGE: ...`, `Co-Authored-By: ...`).
- Pela ferramenta do GitHub (MCP):

  ```
  merge_pull_request(
    owner, repo, pullNumber,
    merge_method: "squash",
    commit_title: "<título do PR> (#<número>)",
    commit_message: "<resumo do PR e rodapés>"
  )
  ```

- Nunca use **Create a merge commit** nem **Rebase and merge**.

Depois do merge, limpe a branch conforme a seção 6 do [SKILL.md](../SKILL.md#6-limpar-depois-do-merge).

## Configuração do repositório no GitHub

Estas opções garantem o fluxo no próprio GitHub e precisam ser feitas por quem administra o repositório, em **Settings > General > Pull Requests**:

- Desmarcar **Allow merge commits**.
- Desmarcar **Allow rebase merging**.
- Manter marcado **Allow squash merging** e escolher **Default to pull request title and description** como mensagem padrão.
- Marcar **Automatically delete head branches**.

Opcional, em **Settings > Rules > Rulesets** (ou **Branches**), para a `main`:

- Exigir Pull Request antes do merge, com ao menos uma aprovação.
- Exigir histórico linear (**Require linear history**).
- Bloquear force push.
