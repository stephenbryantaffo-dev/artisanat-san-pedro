## Objectif
Rendre le texte "Artisanat San Pedro" cliquable (lien vers l'accueil `/`) dans les 3 endroits où il n'est actuellement pas enveloppé dans un `<Link>`.

## Détails
Le `TopNav.tsx` a déjà le logo cliquable. Les endroits à corriger :

1. **NavigationDrawer.tsx** (ligne 63-65) — le titre brand dans l'en-tête du drawer mobile.
2. **ProductDetailPage.tsx** (ligne 76-78) — le texte brand dans le header de la page produit.
3. **ArtisanProfilePage.tsx** (ligne 48-50) — le texte brand dans le header de la page artisan.

## Modifications
- Dans chacun des 3 fichiers, remplacer le `<span>` affichant "Artisanat San Pedro" par un `<Link to="/">` enveloppant ce même `<span>`.
- S'assurer que `Link` est déjà importé depuis `react-router-dom` (vérifier et ajouter si besoin).
- Aucun changement de style ou de comportement autre que l'ajout du lien.

## Résultat attendu
Cliquer sur "Artisanat San Pedro" dans le drawer ou dans les headers de page produit / artisan redirige vers la page d'accueil.