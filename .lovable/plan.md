

## Problèmes identifiés

1. **Bouton Menu (hamburger) en haut à gauche** — C'est un simple `<button>` sans action ni navigation. Il faut lui ajouter un comportement (ouvrir un menu latéral ou naviguer vers l'accueil).

2. **Page "Profil" → 404** — Le BottomNav pointe vers `/profil` mais cette route n'existe pas. La page client est sur `/mon-espace`.

3. **"The Curator"** apparaît dans 3 fichiers et doit être remplacé par **"Artisanat San Pedro"**.

---

## Plan

### 1. Corriger le lien Profil dans BottomNav
- `src/components/BottomNav.tsx` : changer `path: "/profil"` → `path: "/mon-espace"`

### 2. Rendre le bouton Menu fonctionnel
- `src/components/TopNav.tsx` : transformer le bouton Menu en un `Link` vers `/` (accueil), puisqu'il n'y a pas de menu latéral existant dans le projet.

### 3. Renommer "The Curator" → "Artisanat San Pedro"
Modifier dans 3 fichiers :
- `src/components/TopNav.tsx` (ligne 11)
- `src/pages/ProductDetailPage.tsx` (ligne 74)
- `src/pages/ArtisanProfilePage.tsx` (ligne 46)

