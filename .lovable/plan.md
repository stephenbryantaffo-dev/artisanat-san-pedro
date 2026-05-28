## Objectif

Le Preloader (écran noir + compteur 00→100) doit s'afficher **uniquement sur la page d'accueil (`/`)**, et **une seule fois par session** (pas de rejouage en revenant sur l'accueil après navigation).

## Correctif

Modifier uniquement `src/App.tsx` :

1. Déplacer le `<Preloader />` à l'intérieur d'un petit composant wrapper qui :
   - lit `useLocation()` (donc placé sous `<BrowserRouter>`)
   - ne rend le Preloader **que si** `location.pathname === '/'` **ET** qu'un flag `pacte_preloader_shown` n'existe pas encore dans `sessionStorage`
   - écrit ce flag dès qu'il est rendu (via `useEffect`)

2. Conserver le composant `Preloader.tsx` tel quel (aucun changement visuel ni de logique d'animation).

Résultat :
- Premier arrivée sur `/` dans l'onglet → preloader joue.
- Navigation vers `/boutique`, `/artisans/...`, etc. → jamais de preloader.
- Retour sur `/` plus tard dans la même session → pas de preloader.
- Rechargement complet (F5) ou nouvel onglet sur `/` → preloader rejoue.
- Arrivée directe sur une page autre que `/` (ex. lien partagé vers `/artisans/kofi-asante`) → pas de preloader.

## Fichiers touchés

- `src/App.tsx` (déplacement du Preloader dans un wrapper conditionnel sous `BrowserRouter`)

Aucune autre partie du site n'est modifiée.
