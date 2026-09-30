# Branches

## Nome

```
<tipo>/<descricao-em-kebab-case>
```

- `<tipo>`: um dos tipos do Conventional Commits usados no projeto (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`). Use o tipo da mudança principal da tarefa.
- `<descricao>`: em português do Brasil, curta e específica.
  - Só letras minúsculas, números e hífens.
  - Sem acento nem cedilha (`configuracao`, e não `configuração`).
  - Sem hífen no começo, no fim ou repetido.
- Nome completo com no máximo 50 caracteres.

Padrão validado por `scripts/validate.sh branch`:

```
^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)/[a-z0-9]+(-[a-z0-9]+)*$
```

| Nome                                  | Situação                                    |
|---------------------------------------|---------------------------------------------|
| `feat/filtro-por-categoria`           | Certo                                       |
| `fix/rolagem-da-lista-de-conversas`   | Certo                                       |
| `docs/guia-de-contribuicao`           | Certo                                       |
| `feature/filtro`                      | Tipo inexistente (use `feat`)               |
| `feat/Filtro_Categoria`               | Maiúsculas e sublinhado                     |
| `fix/correção-busca`                  | Acento e cedilha                            |
| `feat/category-filter`                | Descrição em inglês                         |
| `filtro-por-categoria`                | Falta o tipo                                |

## Criação

Sempre a partir da `main` atualizada:

```bash
git switch main
git pull origin main
git switch -c feat/filtro-por-categoria
```

- Uma tarefa por branch. Se surgir outra tarefa no meio do caminho, abra outra branch a partir da `main`.
- Nunca commite direto na `main`.

## Manter a branch atualizada com a main

Se a `main` andou enquanto a tarefa estava aberta, traga as mudanças com merge:

```bash
git fetch origin main
git merge origin/main
```

Esse merge fica só na branch da tarefa: o squash merge junta tudo em um único commit na `main`, então o histórico da `main` continua linear. O merge também evita reescrever a branch e fazer force push em algo que já está no GitHub.

Em caso de conflito, resolva, rode `npm run build` e conclua o merge com `git commit`.
