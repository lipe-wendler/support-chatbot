# Conventional Commits no projeto

Resumo da [especificação Conventional Commits 1.0.0](https://www.conventionalcommits.org/pt-br/v1.0.0/) com as escolhas deste repositório. O mesmo formato vale para o cabeçalho dos commits e para o título dos Pull Requests.

## Sumário

- [Estrutura da mensagem](#estrutura-da-mensagem)
- [Tipos](#tipos)
- [Escopo](#escopo)
- [Descrição](#descrição)
- [Corpo](#corpo)
- [Rodapés](#rodapés)
- [Mudanças incompatíveis](#mudanças-incompatíveis)
- [Exemplos](#exemplos)

## Estrutura da mensagem

```
<tipo>[(escopo)][!]: <descrição>
                                    <- linha em branco
[corpo]
                                    <- linha em branco
[rodapés]
```

Só o cabeçalho (primeira linha) é obrigatório. O cabeçalho inteiro tem no máximo 72 caracteres.

## Tipos

| Tipo       | Quando usar                                                            | SemVer |
|------------|------------------------------------------------------------------------|--------|
| `feat`     | Nova funcionalidade para quem usa o sistema                            | MINOR  |
| `fix`      | Correção de bug                                                        | PATCH  |
| `docs`     | Só documentação (README, docs, comentários, skills)                    |        |
| `style`    | Estilo visual ou formatação, sem mudar comportamento                   |        |
| `refactor` | Mudança de código que não corrige bug nem adiciona funcionalidade      |        |
| `perf`     | Melhoria de desempenho                                                 |        |
| `test`     | Adição ou ajuste de testes                                             |        |
| `build`    | Build ou dependências (`package.json`, `next.config.ts`)               |        |
| `ci`       | Integração contínua (GitHub Actions e afins)                           |        |
| `chore`    | Manutenção que não entra nas outras categorias (configs, `.github`)    |        |
| `revert`   | Desfaz um commit anterior                                              |        |

Os tipos ficam em inglês e minúsculos, como na especificação. `feat` e `fix` são definidos pela spec; os demais seguem a convenção Angular recomendada por ela.

No projeto, `style` também cobre ajustes visuais da interface (cores, espaçamentos, tamanhos), como já aparece no histórico.

## Escopo

- Opcional, entre parênteses, logo depois do tipo: `feat(search): ...`.
- Um substantivo em minúsculas com a área do código afetada, em inglês como o código: `chat`, `search`, `layout`, `api`, `theme`, `skills`, `github`, `claude`.
- Omita quando a mudança for ampla demais para uma área só.

## Descrição

- Em português do Brasil.
- Verbo no presente do indicativo, 3a pessoa: `adiciona`, `corrige`, `remove`, `ajusta`, `atualiza`.
- Começa em minúscula e não termina com ponto.
- Diz o que a mudança faz, não o que você fez ("adiciona busca por data", e não "adicionei busca").
- Sem emojis e sem travessões.

## Corpo

- Separado do cabeçalho por uma linha em branco.
- Em português do Brasil, texto livre em um ou mais parágrafos.
- Explica o que mudou e por quê; o como está no diff.
- Linhas com até 72 caracteres.

## Rodapés

- Separados do corpo por uma linha em branco.
- Formato `Token: valor` ou `Token #valor`. Tokens com mais de uma palavra usam hífen (`Co-Authored-By`), exceto `BREAKING CHANGE`.
- Rodapés usados no projeto:
  - `Refs: #12` para citar uma issue ou PR.
  - `Closes #12` para fechar uma issue quando o commit chegar na `main`.
  - `Co-Authored-By: Nome <email>` para coautoria.
  - `BREAKING CHANGE: <explicação>` para mudança incompatível.

## Mudanças incompatíveis

Uma mudança que quebra quem usa o sistema (API, formato de dados, variáveis de ambiente) precisa ser sinalizada de uma destas formas, ou das duas:

- `!` antes dos dois pontos: `feat(api)!: remove rota de conversas antigas`.
- Rodapé `BREAKING CHANGE: <explicação>`. O token fica em inglês e em maiúsculas, como exige a especificação; a explicação vai em português.

Qualquer tipo pode ter `!`, não só `feat`.

## Exemplos

Certos:

```
feat(search): adiciona busca por data nas conversas
```

```
fix(layout): mantém a altura da página fixa com novas mensagens

Um texto apenas para leitores de tela escapava das áreas de rolagem e
esticava a página a cada nova mensagem. As áreas de rolagem agora são
posicionadas, então só a lista de mensagens rola.

Closes #9
```

```
feat(api)!: exige token no envio de mensagens

BREAKING CHANGE: a variável TIMETRACK_TOKEN passa a ser obrigatória no
.env.local; sem ela o envio de mensagens retorna erro 401.
```

```
revert: desfaz busca por data nas conversas

Refs: 3724126
```

Errados:

| Mensagem                                      | Problema                                           |
|-----------------------------------------------|----------------------------------------------------|
| `Adiciona busca`                              | Falta o tipo                                       |
| `feature: adiciona busca`                     | Tipo inexistente (use `feat`)                      |
| `feat: Adiciona busca.`                       | Começa em maiúscula e termina com ponto            |
| `feat(Search): adiciona busca`                | Escopo com maiúscula                               |
| `feat:adiciona busca`                         | Falta espaço depois dos dois pontos                |
| `fix: adicionei correção`                     | Verbo no passado e primeira pessoa                 |
| `feat(search): add date search`               | Descrição em inglês                                |
| `fix: corrige várias coisas`                  | Vago; divida em commits, um por assunto            |
