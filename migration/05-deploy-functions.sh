#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_PROJECT_REF:?}"
DIR="$(dirname "$0")/functions"

# Copie temporaire dans la structure attendue par la CLI
mkdir -p supabase/functions
cp -r "$DIR"/* supabase/functions/

npx supabase functions deploy chat --project-ref "$SUPABASE_PROJECT_REF" --no-verify-jwt

echo ""
echo "⚠️  N'oublie pas de définir le secret de la function :"
echo "   npx supabase secrets set LOVABLE_API_KEY=xxx --project-ref $SUPABASE_PROJECT_REF"
echo "   (ou OPENAI_API_KEY si tu adaptes index.ts)"
