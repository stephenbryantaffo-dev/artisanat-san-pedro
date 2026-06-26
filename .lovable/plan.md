## Contexte & contraintes importantes

Ta demande se heurte à deux limites techniques de l'éditeur Lovable que je dois te signaler avant d'agir :

1. **`src/integrations/supabase/client.ts` et `src/integrations/supabase/types.ts` sont auto-générés** par Lovable Cloud. Si je les édite à la main, Lovable les réécrasera à la prochaine synchro Cloud (toute opération backend, redéploiement de function, etc.) et ton app cassera de façon imprévisible.
2. **Je ne peux pas exécuter `supabase gen types` contre ton projet externe** depuis le sandbox Lovable (pas de `supabase login` interactif, pas d'accès à ton projet `ghzrzlkezdgnldlpnlbc`). La régénération des types doit se faire depuis ta machine.
3. Le fichier `.env` (qui contient `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` pointant vers Cloud) est lui aussi **protégé** — je ne peux pas le modifier.

Conséquence : un remplacement "en dur" dans `client.ts` à l'intérieur de Lovable n'est pas un chemin viable. Je te propose à la place une approche qui **fonctionne pendant que tu édites dans Lovable** ET **bascule proprement sur ton Supabase quand tu héberges ailleurs** (Vercel/Netlify/local).

---

## Plan proposé

### Étape 1 — Mettre à jour `src/integrations/supabase/client.custom.ts`

Le fichier existe déjà (créé lors du package de migration). Je vais le simplifier pour qu'il pointe **directement** vers ton projet, sans dépendre de `.env.local` :

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://ghzrzlkezdgnldlpnlbc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs...NO6U";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { storage: localStorage, persistSession: true, autoRefreshToken: true },
});
```

> Note sécurité : la clé `anon` est publique par design (elle finit dans le bundle JS de toute façon), donc la committer est acceptable. La sécurité repose sur tes politiques RLS côté Supabase.

### Étape 2 — Documenter la bascule dans `migration/README.md`

Mettre à jour la section "Étape 4" pour expliquer la procédure exacte de bascule (une seule ligne à changer dans `client.ts`), à faire **en dehors de Lovable** :

```ts
// src/integrations/supabase/client.ts
export * from "./client.custom";
```

### Étape 3 — Types TypeScript : à faire de ton côté

Je ne peux pas régénérer `types.ts` depuis ici. Tu as deux options, que je documenterai dans le README :

- **Option A (recommandée)** : sur ta machine, après avoir cloné le repo :
  ```bash
  npx supabase login
  npx supabase gen types typescript \
    --project-id ghzrzlkezdgnldlpnlbc \
    > src/integrations/supabase/types.ts
  ```
- **Option B** : copier-coller depuis le Dashboard Supabase → **API Docs → TypeScript types**.

En attendant, le code qui utilise les tables `artisans` / `products` / `profiles` continuera de fonctionner (TypeScript râlera mais runtime sera OK), parce que `ClientHubPage` fait déjà `(supabase as any).from("profiles")`.

### Étape 4 — Ne pas toucher

- `src/integrations/supabase/client.ts` (auto-généré)
- `src/integrations/supabase/types.ts` (auto-généré ; tu le régénères toi-même)
- `.env` (auto-généré)
- Aucun autre fichier de l'app

---

## Résumé de ce qui sera modifié

| Fichier | Action |
|---|---|
| `src/integrations/supabase/client.custom.ts` | Réécrit pour pointer vers ton projet (URL + anon en dur) |
| `migration/README.md` | Section "Étape 4" + "Étape 5" mises à jour avec la procédure réelle |

**Aucun autre fichier touché.** Tant que tu édites dans Lovable, l'app continuera d'utiliser Cloud. Le jour où tu héberges ailleurs, tu remplaces le contenu de `client.ts` par `export * from "./client.custom";` et tu pousses — c'est tout.

---

**Confirme-moi que ce plan te convient**, ou dis-moi si tu préfères que je tente quand même la réécriture directe de `client.ts` (en sachant qu'elle peut être écrasée par Lovable Cloud à tout moment).
