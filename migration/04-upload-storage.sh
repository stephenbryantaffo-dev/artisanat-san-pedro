#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_URL:?}"; : "${SUPABASE_SERVICE_ROLE_KEY:?}"
DIR="$(dirname "$0")/storage"
[ -d "$DIR" ] || { echo "(no storage/ dir — skipping)"; exit 0; }
cd "$DIR"
find . -type f | while read -r f; do
  key="${f#./}"
  echo "→ $key"
  curl -fsS -X POST "$SUPABASE_URL/storage/v1/object/artisan-images/$key" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
    --data-binary "@$f" || echo "  (existe déjà — ignoré)"
done
echo "✅ Upload terminé."
