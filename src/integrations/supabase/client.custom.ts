// Client Supabase pointant vers TON projet Supabase externe (hors Lovable Cloud).
//
// Activation (à faire HORS de l'éditeur Lovable, sur ta machine / dans ton repo Git) :
//   Remplace le contenu de ./client.ts par UNE seule ligne :
//       export * from "./client.custom";
//
// Ne fais PAS cette bascule dans l'éditeur Lovable : le fichier client.ts y est
// auto-régénéré par Lovable Cloud et ta modification sera écrasée.
//
// La clé anon est publique par design (elle finit dans le bundle JS) — la
// sécurité repose sur tes politiques RLS côté Supabase.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://ghzrzlkezdgnldlpnlbc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoenJ6bGtlemRnbmxkbHBubGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODQxOTgsImV4cCI6MjA5ODA2MDE5OH0.-FB1PYLjebKPzboW-ABMXv5crWP2dkrLgNraLypNO6U";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});