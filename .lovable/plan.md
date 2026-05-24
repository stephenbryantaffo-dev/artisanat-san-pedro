Le composant `Footer.tsx` existe mais n'est jamais rendu. `AppShell.tsx` (utilisé par toutes les pages principales) contient `TopNav` + `BrandBar` mais pas de Footer. Le footer actuel est basique, avec des liens morts (`href="#"`) et n'utilise pas le design system editorial (tokens HSL, typographies Noto Serif/Manrope, pas de bordures 1px).

## Objectif
Intégrer un footer editorial cohérent sur toutes les pages, en l'ajoutant à `AppShell` et en réécrivant le composant pour matcher le design system "Editorial Artisan".

## Plan

### 1. Réécrire `src/components/Footer.tsx`
- Supprimer les bordures 1px (contraire aux règles du design system) ; utiliser des décalages de fond (`bg-surface-container`, `bg-surface-container-low`) pour la séparation.
- Utiliser les tokens Tailwind du projet : `font-serif`, `text-inverse-surface`, `text-muted-foreground`, `bg-surface-container`, `text-primary`, `tracking-widest`.
- Remplacer tous les `<a href="#">` par des `<Link>` de `react-router-dom` avec les vraies routes du site (`/boutique`, `/artisans`, `/decouverte`, `/a-propos`, `/contact`).
- Adapter le contenu au contexte ivoirien : remplacer "Galerie" par "Boutique", "Collections" par "Découverte", ajouter un lien "Contact".
- Styliser le titre avec la signature éditoriale : `Artisanat <span className="italic text-primary">San Pedro</span>`.
- Ajouter un séparateur visuel subtil (gradient horizontal ou simple padding) au lieu d'une bordure.
- Garder 4 colonnes sur desktop, empilé sur mobile.
- Conserver la ligne de copyright.

### 2. Intégrer le Footer dans `src/components/AppShell.tsx`
- Importer `Footer`.
- L'ajouter juste avant `BrandBar` (ou après `<main>`, selon l'ordre logique) : `TopNav` → `<main>` → `<Footer />` → `<BrandBar>`.

### 3. Nettoyer la vieille page `src/pages/Index.tsx`
- Cette page importe `Footer` mais n'est plus routée (App.tsx pointe vers `HomePage`). Supprimer l'import obsolète de `Footer` pour éviter toute confusion future.

### 4. Vérification visuelle
- S'assurer que le footer utilise bien les classes du design system et non des couleurs hardcodées inappropriées.
- Confirmer qu'il s'affiche sur toutes les pages (`/`, `/boutique`, `/artisans`, `/a-propos`, `/contact`, etc.).