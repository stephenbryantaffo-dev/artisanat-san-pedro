# Migrer les utilisateurs (auth.users)

La table `auth.users` est gérée par Supabase et n'accepte pas de simple
`INSERT` cross-projet (les hash de mot de passe sont liés au projet d'origine).

## Option A — Repartir à zéro (recommandé pour un MVP)

Les utilisateurs refont un signup sur le nouveau projet. Le trigger
`handle_new_user` crée automatiquement leur profil.

## Option B — Migration via l'API Admin

1. Exporte la liste depuis l'ancien projet (à exécuter sur Cloud) :
   ```sql
   select id, email, raw_user_meta_data, created_at from auth.users;
   ```
2. Pour chaque utilisateur, appelle l'API Admin du nouveau projet :
   ```bash
   curl -X POST "$SUPABASE_URL/auth/v1/admin/users" \
     -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
     -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "email":"user@example.com",
       "email_confirm":true,
       "user_metadata":{"full_name":"…"}
     }'
   ```
3. Envoie un email de reset password à chacun (les mots de passe ne migrent pas).

## Configuration Google OAuth

Dashboard Supabase → Authentication → Providers → Google :
- Client ID / Secret : ceux de ta console Google Cloud
- Redirect URL à ajouter dans Google Cloud Console :
  `https://<project>.supabase.co/auth/v1/callback`

Authentication → URL Configuration :
- Site URL : ton domaine de production
- Redirect URLs : ajoute `http://localhost:8080`, ton domaine prod, etc.
