#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_URL:?}"; : "${SUPABASE_SERVICE_ROLE_KEY:?}"; : "${SUPABASE_DB_URL:?}"

# Crée le bucket public artisan-images (idempotent)
curl -fsS -X POST "$SUPABASE_URL/storage/v1/bucket" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"id":"artisan-images","name":"artisan-images","public":true}' \
  || echo "(bucket existe déjà — OK)"

# Policies storage : lecture publique + écriture authentifiée
psql "$SUPABASE_DB_URL" <<'SQL'
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='storage' and policyname='Public read artisan-images') then
    create policy "Public read artisan-images" on storage.objects
      for select using (bucket_id = 'artisan-images');
  end if;
  if not exists (select 1 from pg_policies where schemaname='storage' and policyname='Auth upload artisan-images') then
    create policy "Auth upload artisan-images" on storage.objects
      for insert to authenticated
      with check (bucket_id = 'artisan-images');
  end if;
  if not exists (select 1 from pg_policies where schemaname='storage' and policyname='Auth update own artisan-images') then
    create policy "Auth update own artisan-images" on storage.objects
      for update to authenticated
      using (bucket_id = 'artisan-images' and owner = auth.uid());
  end if;
end $$;
SQL
echo "✅ Bucket artisan-images prêt."
