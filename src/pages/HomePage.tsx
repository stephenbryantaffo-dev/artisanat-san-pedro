import { useState } from "react";
import { Search, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import AppShell from "@/components/AppShell";
import { ProductCard, mockProducts } from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { categoryAccent } from "@/lib/categoryColors";

import heroImg from "@/assets/hero-sculptor.jpg";
import catSculpture from "@/assets/cat-sculpture.jpg";
import catTressage from "@/assets/cat-tressage.jpg";
import catTissage from "@/assets/cat-tissage.jpg";
import catPottery from "@/assets/featured-pottery.jpg";
import catForge from "@/assets/cat-forge.jpg";
import catPeinture from "@/assets/cat-peinture.jpg";

import artisanKofi from "@/assets/artisan-kofi.jpg";
import artisanAma from "@/assets/artisan-ama.jpg";
import artisanYao from "@/assets/artisan-yao.jpg";

/* ─── SECTION 1: HERO ─── */
const HeroSection = () => (
  <section className="relative min-h-[100svh] overflow-hidden flex items-end">
    <img
      src={heroImg}
      alt="Artisan sculpteur à San Pedro"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: "brightness(0.80) contrast(1.1) sepia(0.2)" }}
      width={1080}
      height={1920}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(45,74,45,0.30) 0%, rgba(139,26,26,0.15) 50%, rgba(14,13,13,0.85) 100%)",
      }}
    />

    <div className="relative z-10 w-full px-6 pb-16">
      <span className="label-caps mb-4 block text-[10px]" style={{ color: "#4A7A4A" }}>
        Artisanat San Pedro · PACTE
      </span>
      <h1 className="font-serif text-5xl leading-tight text-foreground mb-6" style={{ mixBlendMode: "difference" }}>
        L'art <span className="italic font-light">vivant</span> de
        <br />
        Côte <span className="italic font-bold" style={{ color: "#2D4A2D" }}>d'Ivoire</span>
      </h1>

      {/* AI Search bar */}
      <div className="glass-card rounded-full border border-border/20 shadow-luxury flex items-center gap-3 p-2 w-full">
        <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <input
          type="text"
          placeholder="Décrivez ce que vous cherchez…"
          className="bg-transparent border-none outline-none flex-1 font-light text-sm text-foreground placeholder:text-muted-foreground"
        />
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors shrink-0">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Brand signature dots */}
      <div className="flex gap-2 mt-4 opacity-60">
        <span className="w-2 h-2 rounded-full" style={{ background: "#99420d" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#8B1A1A" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#2D4A2D" }} />
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-5 h-5 text-foreground/40" />
    </div>
  </section>
);

/* ─── SECTION 2: STATS BENTO ─── */
const StatsBento = () => (
  <section className="relative z-10 -mt-10 px-6">
    <div className="grid grid-cols-2 gap-3">
      <div className="glass-card rounded-bento p-6 border border-border/10 shadow-luxury">
        <span className="font-serif text-3xl text-primary">240+</span>
        <p className="label-caps text-[10px] text-muted-foreground mt-1">Artisans</p>
      </div>
      <div className="bg-primary/5 rounded-bento p-6 border border-primary/5">
        <span className="font-serif text-3xl text-inverse-surface">1 200</span>
        <p className="label-caps text-[10px] text-muted-foreground mt-1">Œuvres</p>
      </div>
      <div className="glass-card col-span-2 rounded-bento p-6 border border-border/10 shadow-luxury flex items-center justify-between">
        <div>
          <span className="font-serif text-3xl text-inverse-surface">6</span>
          <p className="label-caps text-[10px] text-muted-foreground mt-1">Métiers d'Excellence</p>
        </div>
        <div className="flex -space-x-3">
          {[artisanKofi, artisanAma, artisanYao].map((src, i) => (
            <div key={i} className="w-10 h-10 rounded-full overflow-hidden border-2 border-background">
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" width={40} height={40} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── SECTION 3: CORPS DE MÉTIERS ─── */
const categories = [
  { code: "SCU", name: "Sculpture", image: catSculpture, count: 31 },
  { code: "TRE", name: "Tressage", image: catTressage, count: 22 },
  { code: "TIS", name: "Tissage", image: catTissage, count: 18 },
  { code: "POT", name: "Poterie", image: catPottery, count: 24 },
  { code: "FOR", name: "Forge", image: catForge, count: 14 },
  { code: "PNT", name: "Peinture", image: catPeinture, count: 19 },
];

const MetiersSection = () => (
  <section className="py-12 px-6">
    <h2 className="font-serif text-2xl text-inverse-surface mb-8">Savoir-faire</h2>
    <div className="grid grid-cols-2 gap-3">
      {categories.map((cat) => {
        const accent = categoryAccent(cat.code);
        return (
          <a
            key={cat.code}
            href="#"
            className="relative rounded-bento overflow-hidden group aspect-[4/5]"
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              width={800}
              height={1000}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${accent.hex}55 0%, rgba(14,13,13,0.25) 60%, transparent 100%)`,
              }}
            />
            <span
              className="absolute top-3 left-3 glass-card px-2 py-1 rounded-lg text-[9px] uppercase tracking-tight font-bold"
              style={{ color: accent.hex }}
            >
              {cat.code}
            </span>
            <div className="absolute bottom-4 left-4">
              <span className="font-serif italic text-lg text-primary-foreground block">
                {cat.name}
              </span>
              <span
                className="text-[9px] uppercase tracking-widest font-bold"
                style={{ color: accent.hex }}
              >
                {cat.count} pièces
              </span>
            </div>
          </a>
        );
      })}
    </div>
  </section>
);

/* ─── SECTION 4: ARTISANS EN VEDETTE ─── */
const artisans = [
  { name: "Kofi Asante", metier: "Sculpteur", since: "Depuis 1998", image: artisanKofi, slug: "kofi-asante" },
  { name: "Ama Diallo", metier: "Potière", since: "Depuis 2005", image: artisanAma, slug: "ama-diallo" },
  { name: "Yao Kouadio", metier: "Tisserand", since: "Depuis 1992", image: artisanYao, slug: "yao-kouadio" },
];

const metierAccent = (metier: string): string => {
  const m = metier.toLowerCase();
  if (m.startsWith("sculpt") || m.startsWith("pot")) return "#99420d";
  if (m.startsWith("tisser") || m.startsWith("tiss")) return "#8B1A1A";
  if (m.startsWith("forge")) return "#8B1A1A";
  if (m.startsWith("tress") || m.startsWith("peintr")) return "#2D4A2D";
  return "#99420d";
};

const ArtisansSection = () => (
  <section className="py-12 bg-surface-container-low">
    <div className="px-6 mb-8">
      <h2 className="font-serif text-2xl italic text-inverse-surface">L'Âme derrière</h2>
      <p className="font-serif text-4xl text-inverse-surface">l'Œuvre</p>
    </div>
    <div className="overflow-x-auto no-scrollbar flex gap-4 pb-4 -mx-6 px-6">
      {artisans.map((a) => (
        <div key={a.slug} className="min-w-[260px] relative rounded-bento overflow-hidden shrink-0">
          <div className="aspect-[3/4]">
            <img
              src={a.image}
              alt={a.name}
              loading="lazy"
              width={750}
              height={1000}
              className="w-full h-full object-cover img-warm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
          <span className="absolute top-4 right-4 glass-card px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-inverse-surface">
            {a.metier}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-serif text-lg text-primary-foreground">{a.name}</h3>
            <span
              className="block w-8 h-0.5 rounded-full mt-1 mb-1"
              style={{ background: metierAccent(a.metier) }}
            />
            <p className="text-xs text-primary-foreground/70">{a.since}</p>
          </div>
          <Link
            to={`/artisans/${a.slug}`}
            className="absolute bottom-4 right-4 w-9 h-9 rounded-full glass-card flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 text-inverse-surface" />
          </Link>
        </div>
      ))}
    </div>
  </section>
);

/* ─── SECTION 5: PIÈCES POPULAIRES ─── */
const PopularSection = () => (
  <section className="py-12 px-6">
    <div className="flex justify-between items-end mb-6">
      <h2 className="font-serif text-2xl text-inverse-surface">Pièces Phares</h2>
      <Link to="/boutique" className="label-caps text-[10px] text-primary underline">
        Voir tout →
      </Link>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {mockProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

/* ─── SECTION 6: ÉDITO CULTUREL ─── */
const EditoSection = () => (
  <section className="py-16 px-6 bg-surface-container-low">
    <span className="font-serif text-3xl italic text-inverse-surface block">L'Héritage</span>
    <span className="label-caps text-[10px] text-muted-foreground mt-2 block">
      Chaque pièce, une histoire
    </span>
    <p className="text-sm text-muted-foreground font-light leading-relaxed mt-6">
      À San Pedro, l'artisanat n'est pas un métier. C'est un langage transmis de génération en génération, façonné par des mains expertes qui transforment la matière brute en expressions vivantes de notre culture. Chaque sculpture, chaque tissu, chaque poterie porte en elle l'empreinte de siècles de tradition.
    </p>
    <blockquote className="font-serif text-3xl italic text-primary mt-6 leading-snug">
      "Chaque pièce porte l'histoire de tout un peuple."
    </blockquote>
    <p className="label-caps text-[10px] text-muted-foreground mt-2 tracking-widest">
      — Kofi Asante, Sculpteur
    </p>
    <div className="flex gap-3 mt-8">
      <Link
        to="/boutique"
        className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light text-primary-foreground uppercase tracking-widest text-[0.7rem] font-bold hover:opacity-90 active:scale-[0.97] transition-all"
      >
        Explorer la Boutique
      </Link>
      <Link
        to="/artisans"
        className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-secondary/20 text-primary uppercase tracking-widest text-[0.7rem] font-bold hover:bg-primary/5 transition-colors"
      >
        Nos Artisans
      </Link>
    </div>
  </section>
);

/* ─── SECTION 7: NEWSLETTER ─── */
const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-12 px-6 pb-16">
      <span className="label-caps text-[10px] text-muted-foreground mb-2 block">Restez connecté</span>
      <h2 className="font-serif text-2xl text-inverse-surface">L'art au bout des doigts</h2>
      <p className="text-sm text-muted-foreground font-light mt-2 mb-6 leading-relaxed">
        Nouvelles créations, portraits d'artisans et événements culturels — chaque mois dans votre boîte mail.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        className="bg-surface-container-low rounded-xl px-4 py-3 w-full border-none text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow"
      />
      <button className="mt-3 w-full py-3 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light text-primary-foreground uppercase tracking-widest text-[0.7rem] font-bold hover:opacity-90 active:scale-[0.97] transition-all">
        S'abonner
      </button>
    </section>
  );
};

/* ─── PAGE ─── */
const HomePage = () => (
  <AppShell>
    <HeroSection />
    <StatsBento />
    <MetiersSection />
    <ArtisansSection />
    <PopularSection />
    <EditoSection />
    <NewsletterSection />
  </AppShell>
);

export default HomePage;
