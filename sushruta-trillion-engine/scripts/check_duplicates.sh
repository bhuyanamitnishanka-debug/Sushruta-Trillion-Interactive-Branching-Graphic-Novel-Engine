#!/usr/bin/env bash
# ==============================================================================
# Sushruta-Trillion: Automated Shell Tool to Inspect & De-duplicate simulation_db.json
# Usage:
#   ./scripts/check_duplicates.sh          # Audit mode (read-only)
#   ./scripts/check_duplicates.sh --fix    # Prune duplicates with atomic backup
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔍 [Sushruta-Trillion] Inspecting simulation_db.json for duplicate transaction logs..."
python3 "$SCRIPT_DIR/check_duplicates.py" "$@"
