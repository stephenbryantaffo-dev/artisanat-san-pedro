import productMask from "@/assets/product-mask.jpg";
import productBowls from "@/assets/product-bowls.jpg";
import productTextile from "@/assets/product-textile.jpg";
import productIronwork from "@/assets/product-ironwork.jpg";
import productBasket from "@/assets/product-basket.jpg";
import productPainting from "@/assets/product-painting.jpg";
import productFigurine from "@/assets/product-figurine.jpg";
import productHooks from "@/assets/product-hooks.jpg";

import artisanKofi from "@/assets/artisan-kofi.jpg";
import artisanAma from "@/assets/artisan-ama.jpg";
import artisanYao from "@/assets/artisan-yao.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryCode: string;
  artisan: string;
  artisanSlug: string;
  artisanAvatar: string;
  artisanMetier: string;
  artisanLocation: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  date: string;
  stock: number;
  description: string;
}

const artisanProfiles = {
  kofi: { slug: "kofi-asante", avatar: artisanKofi, metier: "Sculpteur", location: "San Pedro" },
  ama: { slug: "ama-diallo", avatar: artisanAma, metier: "Potière", location: "San Pedro" },
  yao: { slug: "yao-kouadio", avatar: artisanYao, metier: "Tisserand", location: "San Pedro" },
  moussa: { slug: "moussa-traore", avatar: artisanKofi, metier: "Forgeron", location: "San Pedro" },
  fatou: { slug: "fatou-kone", avatar: artisanAma, metier: "Tresseuse", location: "San Pedro" },
  sekou: { slug: "sekou-bamba", avatar: artisanYao, metier: "Peintre", location: "San Pedro" },
};

export const allProducts: Product[] = [
  {
    id: "1", slug: "masque-baoule-ancien",
    name: "Masque Baoulé Ancien", category: "Sculpture", categoryCode: "SCU",
    artisan: "Kofi Asante", ...artisanProfiles.kofi,
    price: 45000, image: productMask,
    rating: 4.8, reviews: 12, badge: "Coup de cœur", date: "2026-03-15", stock: 2,
    description: "Ce masque Baoulé est une pièce d'exception sculptée dans du bois d'ébène par le maître Kofi Asante. Chaque trait du visage a été minutieusement ciselé selon les techniques ancestrales transmises de père en fils. Le masque incarne l'esprit protecteur du village et symbolise la sagesse des ancêtres. Dimensions : 35 × 22 cm.",
  },
  {
    id: "2", slug: "trio-bols-terre-cuite",
    name: "Trio de Bols Terre Cuite", category: "Poterie", categoryCode: "POT",
    artisan: "Ama Diallo", ...artisanProfiles.ama,
    price: 18500, image: productBowls,
    rating: 4.5, reviews: 8, date: "2026-03-20", stock: 6,
    description: "Ensemble de trois bols en terre cuite, façonnés à la main et décorés de motifs géométriques traditionnels Bété. Cuits au feu de bois selon la méthode ancestrale, ces bols allient beauté artisanale et fonctionnalité quotidienne. Diamètres : 12, 16 et 20 cm.",
  },
  {
    id: "3", slug: "chale-tisse-main",
    name: "Châle Tissé Main", category: "Tissage", categoryCode: "TIS",
    artisan: "Yao Kouadio", ...artisanProfiles.yao,
    price: 32000, image: productTextile,
    rating: 4.9, reviews: 15, badge: "Nouveau", date: "2026-04-01", stock: 4,
    description: "Un châle d'une douceur remarquable, tissé à la main sur un métier traditionnel par le maître tisserand Yao Kouadio. Les teintes chaudes de terre et d'ocre sont obtenues grâce à des teintures végétales naturelles. Chaque pièce nécessite plus de 40 heures de travail. Dimensions : 200 × 70 cm.",
  },
  {
    id: "4", slug: "bougeoir-fer-forge",
    name: "Bougeoir Fer Forgé", category: "Forge", categoryCode: "FOR",
    artisan: "Moussa Traoré", ...artisanProfiles.moussa,
    price: 27500, image: productIronwork,
    rating: 4.3, reviews: 6, date: "2026-02-10", stock: 3,
    description: "Bougeoir en fer forgé aux courbes organiques, martelé à la main dans la forge de Moussa Traoré. La forme sinueuse évoque les lianes de la forêt tropicale. Chaque pièce est unique, portant les marques du marteau comme signature de l'artisan. Hauteur : 25 cm.",
  },
  {
    id: "5", slug: "panier-tresse-couvercle",
    name: "Panier Tressé à Couvercle", category: "Tressage", categoryCode: "TRE",
    artisan: "Fatou Koné", ...artisanProfiles.fatou,
    price: 22000, image: productBasket,
    rating: 4.7, reviews: 10, date: "2026-03-05", stock: 5,
    description: "Panier tressé à couvercle en fibres naturelles de raphia, décoré de motifs losanges en deux tons. Fatou Koné perpétue un savoir-faire maternel avec une précision remarquable. Idéal pour le rangement décoratif ou comme pièce d'art. Diamètre : 30 cm, Hauteur : 20 cm.",
  },
  {
    id: "6", slug: "tableau-geometrique",
    name: "Tableau Géométrique Abstrait", category: "Peinture", categoryCode: "PNT",
    artisan: "Sékou Bamba", ...artisanProfiles.sekou,
    price: 65000, image: productPainting,
    rating: 4.6, reviews: 4, badge: "Pièce unique", date: "2026-04-05", stock: 1,
    description: "Œuvre abstraite sur toile mêlant formes géométriques et couleurs vibrantes. Sékou Bamba s'inspire des paysages urbains et naturels de San Pedro pour créer des compositions audacieuses. Peinture acrylique sur toile tendue. Dimensions : 80 × 100 cm.",
  },
  {
    id: "7", slug: "figurine-maternite",
    name: "Figurine Maternité Ébène", category: "Sculpture", categoryCode: "SCU",
    artisan: "Kofi Asante", ...artisanProfiles.kofi,
    price: 38000, image: productFigurine,
    rating: 5.0, reviews: 18, date: "2026-01-20", stock: 3,
    description: "Figurine sculptée en ébène représentant une mère et son enfant. Cette pièce incarne la tendresse maternelle et la continuité des générations. Sculptée d'un seul bloc de bois d'ébène, elle est polie à la main pour un fini satiné. Hauteur : 28 cm.",
  },
  {
    id: "8", slug: "crochets-muraux-feuille",
    name: "Crochets Muraux Feuille", category: "Forge", categoryCode: "FOR",
    artisan: "Moussa Traoré", ...artisanProfiles.moussa,
    price: 15000, image: productHooks,
    rating: 4.4, reviews: 9, date: "2026-03-28", stock: 8,
    description: "Ensemble de trois crochets muraux en fer forgé, inspirés des feuilles tropicales. Forgés et martelés à la main, ils ajoutent une touche artistique à votre intérieur tout en étant parfaitement fonctionnels. Hauteur : 18 cm chacun.",
  },
];
