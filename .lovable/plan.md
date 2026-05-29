## Modifications dans `src/pages/ProductDetailPage.tsx` uniquement

### 1. Élargir les suggestions de produits
- Logique `relatedProducts` : afficher **6 produits** au lieu de 2.
- Prioriser la même catégorie, puis compléter avec d'autres produits si nécessaire pour toujours atteindre 6.
- Grille passe à `grid-cols-2 md:grid-cols-3` pour mieux occuper l'espace.
- Ajouter sous la grille un CTA centré « Voir toute la boutique → » qui pointe vers `/boutique`.

### 2. Aligner la longueur sur les autres pages (Option 1)
- Importer `Footer` et `BrandBar`.
- Les rendre en bas de la page, juste après la section « Vous aimerez aussi » et avant la barre d'action fixe.
- Augmenter le padding bas du wrapper racine de `pb-16` → `pb-32` pour que le footer/contenu ne soit pas masqué par la barre fixe d'ajout au panier.

Aucun autre fichier modifié. Le header custom (flèche retour + Artisanat San Pedro + partage) et la barre d'achat fixe en bas restent intacts.