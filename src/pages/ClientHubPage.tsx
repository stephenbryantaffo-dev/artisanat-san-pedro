import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, User, Package, ChevronRight, LogOut, Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AppShell from "@/components/AppShell";
import BoutiqueProductCard from "@/components/BoutiqueProductCard";
import { allProducts } from "@/data/products";

const mockOrders = [
  {
    id: "#SP-9402",
    status: "Livrée" as const,
    date: "12 mars 2026",
    total: 45000,
    items: [allProducts[0], allProducts[2]],
  },
  {
    id: "#SP-8731",
    status: "Expédiée" as const,
    date: "8 mars 2026",
    total: 27500,
    items: [allProducts[3]],
  },
  {
    id: "#SP-7615",
    status: "En préparation" as const,
    date: "5 mars 2026",
    total: 18500,
    items: [allProducts[1], allProducts[4]],
  },
];

const statusStyles = {
  "Livrée": "bg-green-100 text-green-800",
  "Expédiée": "bg-blue-100 text-blue-800",
  "En préparation": "bg-amber-100 text-amber-800",
};

const tabs = ["Commandes", "Favoris", "Profil"] as const;

const ClientHubPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Commandes");
  const [favorites] = useState(allProducts.slice(0, 4));
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await (supabase as any)
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (data?.avatar_url) setAvatarUrl(data.avatar_url);
    };
    loadProfile();
  }, []);

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Veuillez sélectionner une image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image trop lourde (max 5 Mo).");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const localPreview = URL.createObjectURL(file);
      setAvatarUrl(localPreview);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setUploadError("Connectez-vous pour sauvegarder définitivement votre photo.");
        setUploading(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `client-avatars/${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage
        .from("artisan-images")
        .upload(filePath, file, { upsert: true });

      if (uploadErr) throw uploadErr;

      const { data: publicUrlData } = supabase.storage
        .from("artisan-images")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateErr } = await (supabase as any)
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateErr) throw updateErr;

      setAvatarUrl(publicUrl);
    } catch (err: any) {
      console.error("Avatar upload error:", err);
      setUploadError("Échec de l'envoi. Réessayez.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <AppShell>
      {/* HEADER */}
      <div className="px-6 pt-24 pb-6">
        <p className="font-serif text-2xl italic text-foreground">Bonjour,</p>
        <p className="font-serif text-4xl italic text-primary">Chloé</p>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
          Votre collection & commandes
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { value: "3", label: "Commandes" },
            { value: "7", label: "Favoris" },
            { value: "88 500", label: "FCFA dépensés" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[hsl(var(--surface-container-low))] rounded-xl p-4 text-center">
              <p className="font-serif text-2xl text-primary">{stat.value}</p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="px-6 border-b border-border/20 mt-2">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[10px] uppercase tracking-widest transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary font-bold"
                  : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="pb-16">
        {activeTab === "Commandes" && (
          <div className="px-6 pt-6 space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-background rounded-[1.5rem] p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-sans font-bold text-sm text-foreground">{order.id}</span>
                  <span className={`text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground uppercase mt-1">{order.date}</p>
                <div className="flex gap-2 mt-3">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-serif text-base text-primary">
                    {order.total.toLocaleString("fr-FR")} FCFA
                  </span>
                  <button className="border border-muted-foreground/20 text-foreground rounded-full uppercase tracking-widest text-[9px] font-bold px-4 py-2 hover:bg-muted/50 transition-colors">
                    Suivre
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Favoris" && (
          <div className="px-6 pt-6">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {favorites.map((product) => (
                  <BoutiqueProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-20">
                <Heart className="w-16 h-16 text-muted-foreground/30" />
                <p className="font-serif text-xl italic text-muted-foreground mt-4">Aucun favori pour l'instant</p>
                <button
                  onClick={() => navigate("/boutique")}
                  className="mt-6 border border-muted-foreground/20 text-foreground rounded-full uppercase tracking-widest text-[9px] font-bold px-6 py-3 hover:bg-muted/50 transition-colors"
                >
                  Découvrir des œuvres
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "Profil" && (
          <div className="px-6 pt-6 space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[hsl(var(--surface-container))] flex items-center justify-center overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                {uploading && (
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFileChange}
              />

              <button
                onClick={triggerFileSelect}
                disabled={uploading}
                className="mt-3 border border-muted-foreground/20 text-foreground rounded-full uppercase tracking-widest text-[9px] font-bold px-4 py-2 flex items-center gap-1.5 hover:bg-muted/50 transition-colors disabled:opacity-50"
              >
                <Camera className="w-3 h-3" />
                {uploading ? "Envoi..." : "Modifier"}
              </button>

              {uploadError && (
                <p className="mt-2 text-[10px] text-destructive text-center max-w-[220px]">
                  {uploadError}
                </p>
              )}
            </div>

            {/* Form fields */}
            {[
              { label: "Prénom", value: "Chloé" },
              { label: "Nom", value: "Moreau" },
              { label: "Email", value: "chloe@email.com" },
              { label: "Téléphone", value: "+225 07 12 34 56" },
              { label: "Adresse de livraison préférée", value: "12 Rue des Palmiers, San Pedro" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">
                  {field.label}
                </label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="bg-[hsl(var(--surface-container-low))] rounded-xl px-4 py-3 w-full border-none text-sm text-foreground focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            ))}

            {/* Language */}
            <div className="flex gap-2 mt-2">
              {["FR", "EN", "ES"].map((lang) => (
                <button
                  key={lang}
                  className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-colors ${
                    lang === "FR"
                      ? "bg-primary text-primary-foreground"
                      : "bg-[hsl(var(--surface-container))] text-muted-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Save */}
            <button className="w-full h-12 bg-gradient-to-br from-[hsl(22,82%,33%)] to-[hsl(25,80%,45%)] text-primary-foreground rounded-full uppercase tracking-widest text-[0.7rem] font-bold hover:opacity-90 active:scale-[0.97] transition-all mt-4">
              Enregistrer
            </button>

            <div className="h-px bg-border/20 my-2" />

            {/* Artisan space link */}
            <button
              onClick={() => navigate("/espace-artisan")}
              className="w-full border border-muted-foreground/20 text-foreground rounded-full uppercase tracking-widest text-[9px] font-bold px-6 py-3 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"
            >
              Espace Artisan <ChevronRight className="w-3 h-3" />
            </button>

            {/* Logout */}
            <button className="w-full text-center mt-6 mb-4">
              <span className="text-destructive text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
                <LogOut className="w-3 h-3" /> Se déconnecter
              </span>
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default ClientHubPage;
