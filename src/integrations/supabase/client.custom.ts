// Client Supabase alternatif — pointe vers TON propre projet Supabase.
//
// Activation (à faire hors Lovable, après avoir suivi migration/README.md) :
//   1. Crée .env.local à la racine :
//        VITE_OWN_SUPABASE_URL=https://<project>.supabase.co
//        VITE_OWN_SUPABASE_ANON_KEY=<anon key>
//   2. Remplace le contenu de ./client.ts par :
//        export * from "./client.custom";
//
// Tant que tu travailles dans l'éditeur Lovable, NE bascule PAS :
// les variables VITE_OWN_* n'existent pas dans le sandbox et l'app cassera.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = import.meta.env.VITE_OWN_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_OWN_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  throw new Error(
    "VITE_OWN_SUPABASE_URL / VITE_OWN_SUPABASE_ANON_KEY manquants. " +
      "Crée un .env.local — voir migration/README.md."
  );
}

export const supabase = createClient<Database>(url, anon, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
