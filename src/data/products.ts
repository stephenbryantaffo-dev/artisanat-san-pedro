import productMask from "@/assets/product-mask.jpg";
import productBowls from "@/assets/product-bowls.jpg";
import productTextile from "@/assets/product-textile.jpg";
import productIronwork from "@/assets/product-ironwork.jpg";
import productBasket from "@/assets/product-basket.jpg";
import productPainting from "@/assets/product-painting.jpg";
import productFigurine from "@/assets/product-figurine.jpg";
import productHooks from "@/assets/product-hooks.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryCode: string;
  artisan: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  date: string;
}

export const allProducts: Product[] = [
  {
    id: "1", slug: "masque-baoule-ancien",
    name: "Masque Baoulé Ancien", category: "Sculpture", categoryCode: "SCU",
    artisan: "Kofi Asante", price: 45000, image: productMask,
    rating: 4.8, reviews: 12, badge: "Coup de cœur", date: "2026-03-15",
  },
  {
    id: "2", slug: "trio-bols-terre-cuite",
    name: "Trio de Bols Terre Cuite", category: "Poterie", categoryCode: "POT",
    artisan: "Ama Diallo", price: 18500, image: productBowls,
    rating: 4.5, reviews: 8, date: "2026-03-20",
  },
  {
    id: "3", slug: "chale-tisse-main",
    name: "Châle Tissé Main", category: "Tissage", categoryCode: "TIS",
    artisan: "Yao Kouadio", price: 32000, image: productTextile,
    rating: 4.9, reviews: 15, badge: "Nouveau", date: "2026-04-01",
  },
  {
    id: "4", slug: "bougeoir-fer-forge",
    name: "Bougeoir Fer Forgé", category: "Forge", categoryCode: "FOR",
    artisan: "Moussa Traoré", price: 27500, image: productIronwork,
    rating: 4.3, reviews: 6, date: "2026-02-10",
  },
  {
    id: "5", slug: "panier-tresse-couvercle",
    name: "Panier Tressé à Couvercle", category: "Tressage", categoryCode: "TRE",
    artisan: "Fatou Koné", price: 22000, image: productBasket,
    rating: 4.7, reviews: 10, date: "2026-03-05",
  },
  {
    id: "6", slug: "tableau-geometrique",
    name: "Tableau Géométrique Abstrait", category: "Peinture", categoryCode: "PNT",
    artisan: "Sékou Bamba", price: 65000, image: productPainting,
    rating: 4.6, reviews: 4, badge: "Pièce unique", date: "2026-04-05",
  },
  {
    id: "7", slug: "figurine-maternite",
    name: "Figurine Maternité Ébène", category: "Sculpture", categoryCode: "SCU",
    artisan: "Kofi Asante", price: 38000, image: productFigurine,
    rating: 5.0, reviews: 18, date: "2026-01-20",
  },
  {
    id: "8", slug: "crochets-muraux-feuille",
    name: "Crochets Muraux Feuille", category: "Forge", categoryCode: "FOR",
    artisan: "Moussa Traoré", price: 15000, image: productHooks,
    rating: 4.4, reviews: 9, date: "2026-03-28",
  },
];
