#!/usr/bin/env bash
# Valida nomes de branch, cabeçalhos de commit e títulos de PR no padrão
# Conventional Commits adotado pelo projeto.
#
# Uso:
#   validate.sh branch "<nome-da-branch>"
#   validate.sh commit "<mensagem ou só o cabeçalho>"
#   validate.sh title  "<título do PR>"
#
# Sai com código 0 quando o valor é válido e 1 quando não é.

set -euo pipefail

# Locale UTF-8 para contar caracteres acentuados como um só e reconhecer
# maiúsculas acentuadas (ex.: "É").
export LC_ALL=C.UTF-8

readonly TYPES='feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert'
readonly MAX_BRANCH_LENGTH=50
readonly MAX_HEADER_LENGTH=72

fail() {
  echo "Inválido: $1" >&2
  exit 1
}

validate_branch() {
  local name="$1"

  if [[ ${#name} -gt $MAX_BRANCH_LENGTH ]]; then
    fail "a branch tem ${#name} caracteres (máximo $MAX_BRANCH_LENGTH)."
  fi

  if [[ ! "$name" =~ ^($TYPES)/ ]]; then
    fail "a branch deve começar com um tipo válido seguido de barra ($TYPES)."
  fi

  if [[ ! "$name" =~ ^($TYPES)/[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    fail "a descrição deve ter só minúsculas sem acento, números e hífens simples (ex.: feat/filtro-por-categoria)."
  fi
}

validate_header() {
  local header="$1"
  local description

  if [[ ${#header} -gt $MAX_HEADER_LENGTH ]]; then
    fail "o cabeçalho tem ${#header} caracteres (máximo $MAX_HEADER_LENGTH)."
  fi

  if [[ ! "$header" =~ ^($TYPES)(\([a-z0-9-]+\))?!?:\ [^[:space:]] ]]; then
    fail "use <tipo>(<escopo>)!: <descrição>, com tipo válido ($TYPES), escopo em minúsculas e um espaço depois dos dois pontos."
  fi

  description="${header#*: }"

  if [[ "$description" =~ ^[[:upper:]] ]]; then
    fail "a descrição deve começar com letra minúscula."
  fi

  if [[ "$description" == *. ]]; then
    fail "a descrição não deve terminar com ponto."
  fi
}

main() {
  if [[ $# -ne 2 ]]; then
    echo "Uso: $0 branch|commit|title \"<valor>\"" >&2
    exit 2
  fi

  local kind="$1"
  local value="$2"

  case "$kind" in
    branch) validate_branch "$value" ;;
    commit | title) validate_header "${value%%$'\n'*}" ;;
    *)
      echo "Tipo de validação desconhecido: $kind (use branch, commit ou title)." >&2
      exit 2
      ;;
  esac

  echo "Válido."
}

main "$@"
