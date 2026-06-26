# Migration Lovable Cloud → Ton propre Supabase

Ce dossier contient tout ce qu'il faut pour répliquer le backend de ce projet
(actuellement hébergé sur Lovable Cloud) vers un projet **Supabase que tu
contrôles toi-même** sur [supabase.com](https://supabase.com).

> **Important** : Lovable Cloud ne peut pas être désactivé sur ce projet une
> fois activé. Cette migration produit un backend parallèle. Tant que tu
> développes dans l'éditeur Lovable, l'app continue de pointer vers Cloud. Le
> jour où tu héberges l'app ailleurs (Vercel, Netlify, etc.), tu basculeras
> l'import du client Supabase (voir Étape 4).

---

## État actuel du backend Cloud

- **Tables `public`** : aucune (le code de `ClientHubPage` référence une
  table `profiles` mais elle n'a jamais été créée — `schema.sql` la crée
  pour toi).
- **Buckets storage** : aucun (le code référence `artisan-images` — créé
  par `03-create-bucket.sh`).
- **Edge functions** : `chat` (Lovable AI Gateway).
- **Auth** : email/password + Google.

---

## Étape 1 — Créer ton projet Supabase

1. Crée un projet sur https://supabase.com/dashboard.
2. Note les valeurs dans **Project Settings → API** : `Project URL`, `anon`, `service_role`.
3. Note le mot de passe DB (**Project Settings → Database**).
4. Installe la CLI Supabase : https://supabase.com/docs/guides/cli

## Étape 2 — Définir tes variables d'environnement

```bash
export SUPABASE_DB_URL="postgresql://postgres:<password>@db.<project>.supabase.co:5432/postgres"
export SUPABASE_URL="https://<project>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<service_role>"
export SUPABASE_PROJECT_REF="<project>"
```

## Étape 3 — Appliquer dans l'ordre

```bash
chmod +x migration/*.sh
./migration/01-apply-schema.sh
./migration/02-import-data.sh        # no-op si data/ est vide
./migration/03-create-bucket.sh
./migration/04-upload-storage.sh     # no-op si storage/ est vide
./migration/05-deploy-functions.sh
```

## Étape 4 — Brancher l'app sur ton Supabase

Un client alternatif est créé à `src/integrations/supabase/client.custom.ts`
qui lit `.env.local` :

```
VITE_OWN_SUPABASE_URL=https://<project>.supabase.co
VITE_OWN_SUPABASE_ANON_KEY=<anon>
```

Pour basculer l'app **hors Lovable** : remplace le contenu de
`src/integrations/supabase/client.ts` par `export * from "./client.custom";`.
Ne le fais PAS tant que tu édites dans Lovable (ça casse le preview).

## Étape 5 — Régénérer les types TypeScript

```bash
npx supabase login
npx supabase link --project-ref $SUPABASE_PROJECT_REF
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

## Étape 6 — Migrer les utilisateurs

Voir `06-migrate-users.md`.

## Checklist post-migration

- [ ] `select * from public.profiles limit 1;` répond sans erreur
- [ ] Bucket `artisan-images` visible dans le dashboard
- [ ] `supabase functions invoke chat` retourne 200
- [ ] Auth Google configuré (Dashboard → Authentication → Providers)
- [ ] Redirect URLs définies (Auth → URL Configuration)
- [ ] Secret `LOVABLE_API_KEY` (ou OpenAI/Anthropic) défini sur la function

## Se détacher complètement du gateway Lovable

L'edge function `chat` appelle `ai.gateway.lovable.dev`. Pour utiliser
OpenAI / Anthropic directement, voir l'en-tête commenté dans
`functions/chat/index.ts`.
