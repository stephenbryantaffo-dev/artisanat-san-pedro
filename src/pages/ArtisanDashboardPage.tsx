import { useNavigate } from "react-router-dom";
import { Package, Eye, ShoppingCart, Star, Sparkles, ChevronRight, AlertTriangle, Check } from "lucide-react";
import AppShell from "@/components/AppShell";
import { allProducts } from "@/data/products";
import { allArtisans } from "@/data/artisans";

const artisan = allArtisans[0]; // Kofi Asante
const artisanProducts = allProducts.filter((p) => p.artisanSlug === artisan.slug);

const mockOrders = [
  { id: "#SP-9402", client: "Chloé Martin", initials: "CM", amount: 45000, status: "pending" as const },
  { id: "#SP-8731", client: "Jean Dupont", initials: "JD", amount: 32000, status: "shipped" as const },
  { id: "#SP-7615", client: "Marie Koné", initials: "MK", amount: 18500, status: "pending" as const },
];

const lowStockProducts = artisanProducts.filter((p) => p.stock <= 2);

const ArtisanDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      {/* Header */}
      <div className="px-6 pt-24 pb-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">TABLEAU DE BORD</p>
        <h1 className="font-serif text-3xl italic text-foreground">{artisan.name}</h1>
        <span className="inline-block mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] uppercase tracking-widest backdrop-blur-sm">
          {artisan.metier}
        </span>
      </div>

      {/* Stats Bento */}
      <div className="px-6 mt-6 grid grid-cols-2 gap-3">
        {[
          { icon: Package, value: artisanProducts.length.toString(), label: "Total Produits", bg: "bg-surface-container-low" },
          { icon: Eye, value: "1,2k", label: "Vues (mois)", bg: "bg-surface-container" },
          { icon: ShoppingCart, value: "8", label: "Commandes", bg: "bg-surface-container" },
          { icon: Star, value: artisan.rating.toString(), label: "Note Globale", bg: "bg-surface-container-low" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} p-5 rounded-xl`}>
            <stat.icon className="w-5 h-5 text-primary mb-2" />
            <p className="font-serif text-3xl text-foreground">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="px-6 mt-6">
          <div className="bg-destructive/10 text-destructive rounded-[1.5rem] p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              Stock faible : {lowStockProducts[0].name} ({lowStockProducts[0].stock} restant{lowStockProducts[0].stock > 1 ? "s" : ""})
            </p>
          </div>
        </div>
      )}

      {/* AI Generation CTA */}
      <div className="px-6 mt-6">
        <div className="bg-background rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(14,13,13,0.04)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary fill-primary" />
            <span className="font-serif text-lg text-foreground">Ajouter avec l'IA</span>
          </div>
          <p className="text-xs text-muted-foreground font-light mt-1">
            Décrivez votre œuvre, l'IA rédige votre fiche.
          </p>
          <button
            onClick={() => navigate("/espace-artisan/ia-studio")}
            className="mt-4 w-full bg-background border-l-4 border-primary text-primary text-[10px] uppercase tracking-widest py-4 rounded-r-xl text-left pl-6 flex justify-between items-center font-semibold"
          >
            Ouvrir l'IA Studio
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="font-serif text-xl text-foreground">Vos Produits</h2>
          <button className="text-primary text-[10px] underline">Gérer tout →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {artisanProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] bg-surface-container-low rounded-[1.5rem] overflow-hidden flex flex-col flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-serif text-sm text-foreground">{product.name}</p>
                  <p className="text-primary font-bold text-xs mt-1">{product.price.toLocaleString("fr-FR")} FCFA</p>
                  <p className="text-[10px] uppercase text-muted-foreground mt-1">Stock: {product.stock}</p>
                </div>
                <button className="mt-3 w-full py-2 rounded-full border border-secondary/20 text-primary text-[10px] uppercase tracking-widest font-bold hover:bg-secondary/10 transition-colors">
                  Modifier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="px-6 mt-8 pb-16">
        <h2 className="font-serif text-xl text-foreground mb-4">Commandes Récentes</h2>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-surface-container-low p-4 rounded-[1.5rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-xs">
                  {order.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{order.id}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">
                    {order.client} · {order.amount.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </div>
              {order.status === "pending" ? (
                <button className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-2 rounded-full font-bold">
                  Expédier
                </button>
              ) : (
                <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-2 text-[10px] uppercase flex items-center gap-1">
                  <Check className="w-3 h-3" /> Posté
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default ArtisanDashboardPage;
