## Contexte important

Ce projet utilise **Lovable Cloud** (un backend Supabase géré par Lovable). Une fois Cloud activé sur un projet, il n'est **pas possible de le déconnecter** ni de le remplacer en place par un autre projet Supabase. La voie réaliste pour "sortir" et avoir ton propre backend est donc :

1. Créer **ton propre projet Supabase** sur supabase.com (compte que tu contrôles).
2. **Exporter** schéma + données + storage + edge functions depuis Cloud.
3. **Réimporter** dans ton projet Supabase.
4. Garder le code de l'app (React) tel quel — seules les variables d'environnement de connexion changent. À terme, tu pourras héberger l'app où tu veux (Vercel, Netlify, etc.) en pointant vers ton Supabase.

Je ne peux pas modifier en parallèle le projet Lovable Cloud actif — donc cette migration produit un **package d'export** que tu utiliseras côté supabase.com, plus une **branche de code** prête à pointer vers ton instance.

---

## Plan de migration

### Étape 1 — Préparer l'export depuis Cloud
- Générer un fichier `migration/schema.sql` contenant la définition complète de la table `profiles` (colonnes, contraintes, RLS, policies, triggers, GRANTs).
- Exporter les données existantes : CSV de `public.profiles` vers `migration/data/profiles.csv`.
- Lister tous les fichiers du bucket `artisan-images` et générer un script `migration/storage-export.sh` qui les télécharge en local (via l'API Storage de Cloud avec la clé service_role temporaire).
- Copier le code des edge functions (actuellement : `chat`) dans `migration/functions/`.

### Étape 2 — Créer ton projet Supabase
Instructions claires (hors code) que je te donnerai :
- Créer un projet sur supabase.com.
- Récupérer : `Project URL`, `anon key`, `service_role key`, le mot de passe DB.
- Activer les providers Auth identiques (Email + Google) avec les mêmes Redirect URLs.

### Étape 3 — Importer dans ton Supabase
Scripts fournis dans `migration/` :
- `01-apply-schema.sh` → applique `schema.sql` via `psql`.
- `02-import-data.sh` → COPY des CSV.
- `03-create-bucket.sh` → crée le bucket `artisan-images` (public) + policies.
- `04-upload-storage.sh` → réuploade les fichiers téléchargés.
- `05-deploy-functions.sh` → `supabase functions deploy chat` + set du secret `LOVABLE_API_KEY` (ou ta propre clé OpenAI/Gemini si tu veux te détacher complètement du gateway Lovable).

### Étape 4 — Brancher l'app sur ton Supabase
- Créer `src/integrations/supabase/client.custom.ts` qui lit `VITE_OWN_SUPABASE_URL` et `VITE_OWN_SUPABASE_ANON_KEY` depuis `.env.local`.
- Ajouter un README `migration/README.md` expliquant comment basculer les imports `@/integrations/supabase/client` vers ce nouveau client le jour où tu héberges l'app hors Lovable (un simple find/replace).
- Tant que tu travailles dans Lovable, l'app continue de pointer vers Cloud (sinon elle casse ici).

### Étape 5 — Documentation
`migration/README.md` détaillé :
- Ordre exact des scripts.
- Comment régénérer les types TS (`supabase gen types`).
- Checklist post-migration (auth, RLS, storage URL, edge function secrets, CORS).
- Limites : la table `auth.users` ne peut pas être exportée/importée 1:1 — les utilisateurs existants devront refaire un signup OU tu utilises l'API Admin de Supabase pour les recréer (script fourni `migration/06-migrate-users.md` avec la procédure).

---

## Détails techniques

- L'export DB se fait via `psql -c "COPY ..."` (les dumps complets `pg_dump` ne sont pas disponibles sur Cloud — seuls les exports CSV par table le sont).
- Pour le storage, j'utiliserai l'API REST `/storage/v1/object/list/artisan-images` puis téléchargerai chaque objet.
- La edge function `chat` utilise `LOVABLE_API_KEY` (Lovable AI Gateway). Sur ton propre Supabase, soit tu gardes cette clé (elle fonctionne hors Cloud tant que ton workspace Lovable existe), soit tu migres vers OpenAI/Anthropic directement — je fournirai les deux variantes commentées.
- Aucune modification du code applicatif existant (pages, composants) — uniquement ajout du dossier `migration/` et d'un fichier client alternatif.

---

## Livrables

```text
migration/
├── README.md                  ← guide pas à pas
├── schema.sql                 ← DDL complet
├── data/
│   └── profiles.csv
├── storage/
│   └── (fichiers téléchargés du bucket)
├── functions/
│   └── chat/index.ts
├── 01-apply-schema.sh
├── 02-import-data.sh
├── 03-create-bucket.sh
├── 04-upload-storage.sh
├── 05-deploy-functions.sh
└── 06-migrate-users.md
src/integrations/supabase/
└── client.custom.ts           ← client alternatif (inactif par défaut)
```

Confirme-moi que tu veux que je procède ainsi et je lance l'implémentation.