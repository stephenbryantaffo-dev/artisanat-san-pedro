#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_DB_URL:?SUPABASE_DB_URL must be set}"
psql "$SUPABASE_DB_URL" -f "$(dirname "$0")/schema.sql"
echo "✅ Schema applied."
