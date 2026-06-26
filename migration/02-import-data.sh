#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_DB_URL:?SUPABASE_DB_URL must be set}"
DIR="$(dirname "$0")/data"
shopt -s nullglob
for f in "$DIR"/*.csv; do
  table=$(basename "$f" .csv)
  echo "→ Importing $table"
  psql "$SUPABASE_DB_URL" -c "\COPY public.$table FROM '$f' WITH (FORMAT csv, HEADER true);"
done
echo "✅ Data import done (or skipped if no CSV)."
