import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ArtisanUI {
  id: string;
  slug: string;
  name: string;
  metier: string;
  metierCategory: string;
  avatar: string;
  coverImage: string;
  location: string;
  since: number;
  rating: number;
  reviews: number;
  productsCount: number;
  bio: string;
  featured: boolean;
  initials: string;
  accentColor: string;
}

const ACCENT_BY_CATEGORY: Record<string, string> = {
  Sculpture: "#8B3A0F",
  Tressage: "#2D4A2D",
  Tissage: "#8B1A1A",
  Poterie: "#8B3A0F",
  Forge: "#8B1A1A",
  Peinture: "#2D4A2D",
  Bijouterie: "#8B1A1A",
  Botterie: "#5C3A1E",
  Accessoires: "#2D4A2D",
  Sérigraphie: "#8B3A0F",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function mapArtisanRow(row: any): ArtisanUI {
  const accent = ACCENT_BY_CATEGORY[row.metier_category] || "#8B3A0F";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    metier: row.metier,
    metierCategory: row.metier_category,
    avatar: row.avatar_url || "",
    coverImage: row.cover_image_url || "",
    location: row.location,
    since: row.since ?? new Date().getFullYear(),
    rating: row.rating ?? 0,
    reviews: row.reviews_count ?? 0,
    productsCount: row.products_count ?? 0,
    bio: row.bio ?? "",
    featured: row.featured ?? false,
    initials: getInitials(row.name ?? ""),
    accentColor: accent,
  };
}

export function useArtisans() {
  return useQuery({
    queryKey: ["artisans"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("artisans")
        .select("*")
        .eq("published", true)
        .order("diagnostic_order", { ascending: true });
      if (error) throw error;
      return ((data as any[]) ?? []).map(mapArtisanRow);
    },
    staleTime: 60000,
  });
}

export function useArtisan(slug: string | undefined) {
  return useQuery({
    queryKey: ["artisan", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("artisans")
        .select("*")
        .eq("slug", slug as string)
        .maybeSingle();
      if (error) throw error;
      return data ? mapArtisanRow(data) : null;
    },
  });
}