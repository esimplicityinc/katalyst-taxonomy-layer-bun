# Common helpers for Just-based automation.

# Emit a banner similar to the STEP macro in Makefiles.
BANNER_DEF := '''
banner() {
  local message="$1"
  printf '\n\033[1;36m%s\033[0m\n' "$(printf '#%.0s' $(seq 1 ${BANNER_WIDTH:-60}))"
  printf '\033[1;36m## %s ##\033[0m\n' "$message"
  printf '\033[1;36m%s\033[0m\n' "$(printf '#%.0s' $(seq 1 ${BANNER_WIDTH:-60}))"
}
'''

# Convenience helper to raise a consistent "not yet implemented" error from
# placeholder recipes. Call with the module/recipe identifier for clarity.
TODO_DEF := '''
todo() {
  local recipe="$1"
  >&2 printf '\033[1;33mTODO:\033[0m %s\n' "$recipe"
  exit 2
}
'''

ENV_HELPERS := '''
	REPO_ROOT="${REPO_ROOT:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
	ENV_UTILS="$REPO_ROOT/.global/taxonomy/actions/just/scripts/env-utils.sh"
	if [ -f "$ENV_UTILS" ]; then
	  . "$ENV_UTILS"
	fi
'''

LOG_HELPERS := '''
	log_step() {
	  local message="$1"
	  printf '\033[1;35m» %s\033[0m\n' "$message"
	}

	log_substep() {
	  local message="$1"
	  printf '   \033[0;36m- %s\033[0m\n' "$message"
	}

	log_warn() {
	  local message="$1"
	  printf '\033[1;33m! %s\033[0m\n' "$message"
	}

	log_error() {
	  local message="$1"
	  printf '\033[1;31m✖ %s\033[0m\n' "$message"
	}
'''

LAYER_ENV_HELPERS := '''
	resolve_layer_env() {
	  local default="${1:-dev}"
	  if [ -n "${ENV:-}" ]; then
	    printf '%s\n' "$ENV"
	    return 0
	  fi
	  printf '%s\n' "$default"
	}
'''
