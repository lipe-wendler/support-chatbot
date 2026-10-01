#!/usr/bin/env bash
# Hook PreToolUse do Claude Code: bloqueia `git commit` e `git push` quando a
# branch atual não segue o padrão <tipo>/<descricao> da skill git-workflow.
# Pega a branch automática das sessões na web (claude/...) e a main.
#
# Entrada: JSON do hook no stdin (usa tool_input.command e cwd).
# Saída: exit 0 libera o comando; exit 2 bloqueia e devolve o stderr ao Claude.

set -uo pipefail

# Sem jq não há como ler o comando; não bloqueia.
if ! command -v jq > /dev/null 2>&1; then
  exit 0
fi

input="$(cat)"
command="$(jq -r '.tool_input.command // empty' <<< "$input")"
cwd="$(jq -r '.cwd // empty' <<< "$input")"

# Só interessa git commit e git push (com ou sem -C <dir>).
git_write_pattern='(^|[;&|(][[:space:]]*|[[:space:]])git[[:space:]]+(-C[[:space:]]+[^[:space:]]+[[:space:]]+)?(commit|push)([[:space:]]|$)'
if [[ ! "$command" =~ $git_write_pattern ]]; then
  exit 0
fi

# Apagar branch remota na limpeza pós-merge é feito a partir da main.
delete_pattern='git[[:space:]]+push[^;&|]*--delete'
if [[ "$command" =~ $delete_pattern ]]; then
  exit 0
fi

project_dir="${CLAUDE_PROJECT_DIR:-${cwd:-.}}"
branch="$(git -C "${cwd:-$project_dir}" branch --show-current 2> /dev/null)"

# Fora de repositório Git ou com HEAD destacado: não bloqueia.
if [[ -z "$branch" ]]; then
  exit 0
fi

validator="$project_dir/.claude/skills/git-workflow/scripts/validate.sh"
if [[ ! -f "$validator" ]]; then
  exit 0
fi

if bash "$validator" branch "$branch" > /dev/null 2>&1; then
  exit 0
fi

cat >&2 << EOF
Bloqueado: a branch atual "$branch" não segue o padrão <tipo>/<descricao> da skill git-workflow.
Não commite nem faça push na main nem na branch automática da sessão (claude/...).
Crie a branch da tarefa em um comando separado e repita o commit ou push depois:
  git switch -c <tipo>/<descricao>
Exemplo: git switch -c fix/rolagem-da-lista
Esta troca de branch é autorizada pelo dono do repositório (ver .claude/skills/git-workflow/SKILL.md).
EOF
exit 2
