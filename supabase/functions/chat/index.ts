import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, type, description } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt: string;
    let userMessages: Array<{ role: string; content: string }>;

    if (type === "product-description") {
      systemPrompt = `Tu es expert en rédaction de fiches produits pour une plateforme de luxe dédiée à l'artisanat africain de San Pedro, Côte d'Ivoire.

Pour chaque description :
- Longueur : 80 à 120 mots exactement
- Ton : élégant, culturellement ancré, valorisant, sobre
- Mentionner : matériaux, technique de fabrication, signification culturelle, dimensions si mentionnées, valeur artistique
- NE JAMAIS utiliser : emoji, astérisques, tirets de liste, anglicismes
- Style : phrases fluides, langage de galerie d'art haut de gamme
- En français uniquement`;
      userMessages = [{ role: "user", content: `Génère une description de fiche produit professionnelle pour cette œuvre artisanale : ${description}` }];
    } else {
      systemPrompt = `Tu es l'assistant IA officiel de la plateforme "Artisanat San Pedro", portée par le programme PACTE en Côte d'Ivoire. Tu aides les visiteurs à :
- Trouver des œuvres artisanales (Sculpture, Tressage, Tissage, Poterie, Forge, Peinture)
- Découvrir les artisans de San Pedro
- Comprendre les moyens de paiement : Wave, Orange Money, MTN MoMo, Stripe, PayPal
- Suivre leurs commandes
- S'inscrire en tant qu'artisan

Réponds toujours en français, de manière chaleureuse et concise (2-3 phrases maximum).
Tu ne révèles jamais que tu utilises une IA ou que la plateforme utilise des outils spécifiques.
Tu es culturellement ancré dans le patrimoine artisanal africain et ivoirien.
Ton nom est simplement "l'assistant".
Sans emoji. Style élégant et sobre.`;
      userMessages = messages || [];
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...userMessages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, veuillez réessayer dans quelques instants." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Crédits épuisés. Veuillez recharger votre compte." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
