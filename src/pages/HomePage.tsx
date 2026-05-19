import { useState, useEffect } from "react";
import { Search, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { staggerContainer, staggerItem, scaleReveal } from "../lib/motionVariants";
import { lenisInstance } from "../hooks/useLenis";
import { FadeInText } from "../components/ui/FadeInText";
import { Cascade } from "../components/ui/Cascade";
import { useImageDistort } from "../hooks/useImageDistort";
import { useThemeSection } from "../hooks/useThemeSection";
import { ForcedCascade } from "../components/ui/ForcedCascade";

import AppShell from "@/components/AppShell";
import { ProductCard, mockProducts } from "@/components/ProductCard";
import { allProducts } from "@/data/products";

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
const HeroSection = () => {
  const heroRef = useRef(null);
  const distortRef = useImageDistort();

  useEffect(() => {
    const heroImg = document.querySelector('.hero-parallax-img') as HTMLElement | null;
    if (!heroImg) return;
    const handleScroll = ({ scroll }: { scroll: number }) => {
      const speed = 0.35;
      heroImg.style.transform = `translateY(${scroll * speed}px)`;
    };
    lenisInstance?.on('scroll', handleScroll);
    return () => { lenisInstance?.off('scroll', handleScroll); };
  }, []);

  return (
  <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden flex items-end">
    <div ref={distortRef} data-san-scroll className="clip-reveal absolute inset-0 will-change-transform">
      <img
        src={heroImg}
        alt="Artisan sculpteur à San Pedro"
        className="hero-parallax-img w-full h-full object-cover will-change-transform"
        style={{ filter: "brightness(0.80) contrast(1.1) sepia(0.2)" }}
        width={1080}
        height={1920}
      />
    </div>
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(45,74,45,0.30) 0%, rgba(139,26,26,0.15) 50%, rgba(14,13,13,0.85) 100%)",
      }}
    />

    <div className="relative z-10 w-full px-6 pb-16">
      <span className="s-hero-line mb-4 block" style={{ "--index": 0 } as React.CSSProperties}>
        <span className="s-hero-word" style={{ animationDelay: '0.05s' }}>
          <p className="font-label text-[10px] uppercase tracking-widest text-white/70">
            ARTISANAT SAN PEDRO · PACTE
          </p>
        </span>
      </span>
      <h1 className="font-serif text-5xl leading-[1.05] text-white mb-6" style={{ mixBlendMode: "difference" }}>
        <span className="s-hero-line" style={{ "--index": 0 } as React.CSSProperties}>
          <span className="s-hero-word">
            L&apos;art <em className="not-italic text-[#b95925]">vivant</em> de
          </span>
        </span>
        <span className="s-hero-line" style={{ "--index": 1 } as React.CSSProperties}>
          <span className="s-hero-word">
            Côte <em className="italic text-primary">d&apos;Ivoire</em>
          </span>
        </span>
      </h1>

      {/* AI Search bar */}
      <div
        style={{
          opacity: 0,
          animation: 'heroWordReveal 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.65s forwards',
        }}
        className="glass-card rounded-full border border-border/20 shadow-luxury flex items-center gap-3 p-2 w-full"
      >
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="flex gap-2 mt-4 opacity-60"
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "#99420d" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#8B1A1A" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#2D4A2D" }} />
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-5 h-5 text-foreground/40" />
    </div>
  </section>
  );
};

/* ─── SECTION 2: STATS BENTO ─── */
const StatsBento = () => (
  <section className="relative z-10 -mt-10 px-6">
    <motion.div
      className="grid grid-cols-2 gap-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.div variants={staggerItem} className="glass-card rounded-bento p-6 border border-border/10 shadow-luxury">
        <span className="font-serif text-3xl text-primary">240+</span>
        <p className="label-caps text-[10px] text-muted-foreground mt-1">Artisans</p>
      </motion.div>
      <motion.div variants={staggerItem} className="bg-primary/5 rounded-bento p-6 border border-primary/5">
        <span className="font-serif text-3xl text-inverse-surface">1 200</span>
        <p className="label-caps text-[10px] text-muted-foreground mt-1">Œuvres</p>
      </motion.div>
      <motion.div variants={staggerItem} className="glass-card col-span-2 rounded-bento p-6 border border-border/10 shadow-luxury flex items-center justify-between">
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
      </motion.div>
    </motion.div>
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

const metiersDetails: Record<string, { description: string; artisans: number; oeuvres: string; color: string }> = {
  SCU: { description: "Art ancestral du bois et de la pierre, la sculpture baoulé et dan perpétue des siècles de savoir-faire transmis de génération en génération.", artisans: 42, oeuvres: "380+", color: "#99420d" },
  TRE: { description: "Paniers, nattes et objets décoratifs tressés à la main. Chaque entrelacement raconte une histoire de patience et de précision.", artisans: 38, oeuvres: "290+", color: "#2D4A2D" },
  TIS: { description: "Pagnes Baoulé, bogolans et textiles aux motifs géométriques. Le tissage ivoirien conjugue couleurs vives et symbolisme profond.", artisans: 51, oeuvres: "445+", color: "#8B1A1A" },
  POT: { description: "Modelée à la main dans la terre argileuse locale, cuite au bois selon des techniques millénaires.", artisans: 29, oeuvres: "210+", color: "#99420d" },
  FOR: { description: "Bracelets, couteaux cérémoniels et outils forgés au charbon de bois. Le forgeron est aussi gardien de traditions séculaires.", artisans: 18, oeuvres: "95+", color: "#8B1A1A" },
  PNT: { description: "Toiles expressives aux pigments naturels, paysages de lagunes et portraits de village qui capturent l'âme de San Pedro.", artisans: 22, oeuvres: "180+", color: "#2D4A2D" },
};

const metiersItems = categories.map((cat) => {
  const d = metiersDetails[cat.code];
  return {
    id: cat.code,
    content: (
      <div className="relative rounded-[2rem] overflow-hidden" style={{ height: "55vh" }}>
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.75) sepia(0.18)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 to-transparent" />
        <div className="absolute top-6 left-6 w-1 h-12 rounded-full" style={{ background: d.color }} />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="glass-card inline-flex px-3 py-1 rounded-full mb-3">
            <p className="text-[9px] uppercase tracking-widest font-sans font-bold" style={{ color: d.color }}>
              {cat.code}
            </p>
          </div>
          <h3 className="font-serif text-5xl italic text-primary-foreground leading-none mb-3">
            {cat.name}
          </h3>
          <p className="text-sm text-primary-foreground/70 font-light leading-relaxed">
            {d.description}
          </p>
          <div className="flex gap-6 mt-4">
            <div>
              <p className="font-serif text-2xl" style={{ color: d.color }}>{d.artisans}</p>
              <p className="text-[9px] uppercase tracking-widest text-primary-foreground/50 font-sans">Artisans</p>
            </div>
            <div>
              <p className="font-serif text-2xl" style={{ color: d.color }}>{d.oeuvres}</p>
              <p className="text-[9px] uppercase tracking-widest text-primary-foreground/50 font-sans">Œuvres</p>
            </div>
          </div>
        </div>
      </div>
    ),
  };
});

const MetiersSection = () => (
  <ForcedCascade
    items={metiersItems}
    title={<>Nos Corps de <span className="text-primary">Métiers</span></>}
    label="SAVOIR-FAIRE · SAN PEDRO"
  />
);

/* ─── SECTION 4: ARTISANS EN VEDETTE ─── */
const artisans = [
  { name: "Kofi Asante", metier: "Sculpteur", since: "1998", image: artisanKofi, slug: "kofi-asante", bio: "Maître sculpteur baoulé reconnu pour ses masques cérémoniels en ébène, gardiens des esprits ancestraux." },
  { name: "Ama Diallo", metier: "Potière", since: "2005", image: artisanAma, slug: "ama-diallo", bio: "Sa poterie sénoufo cuite au feu de bois marie traditions séculaires et formes contemporaines épurées." },
  { name: "Yao Kouadio", metier: "Tisserand", since: "1992", image: artisanYao, slug: "yao-kouadio", bio: "Tisserand virtuose dont les pagnes Baoulé aux motifs géométriques voyagent jusqu'aux galeries européennes." },
];

const artisansItems = artisans.map((a) => ({
  id: a.slug,
  content: (
    <div className="flex flex-col gap-4" style={{ height: "55vh" }}>
      <div className="relative flex-1 rounded-[2rem] overflow-hidden">
        <img
          src={a.image}
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(0.2) sepia(0.15)" }}
          alt={a.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/75 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-[9px] uppercase tracking-widest text-primary-foreground/60 mb-1 font-sans">
            {a.metier}
          </p>
          <h3 className="font-serif text-4xl italic text-primary-foreground">{a.name}</h3>
          <p className="text-sm text-primary-foreground/60 font-light mt-1">
            Depuis {a.since} · San Pedro, Côte d'Ivoire
          </p>
        </div>
      </div>
      <div className="bg-surface-container-low rounded-[1.5rem] p-5 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-light flex-1 line-clamp-2">
          {a.bio}
        </p>
        <Link
          to={`/artisans/${a.slug}`}
          className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light text-primary-foreground uppercase tracking-widest text-[10px] font-bold flex-shrink-0"
        >
          Voir le profil
        </Link>
      </div>
    </div>
  ),
}));

const ArtisansSection = () => (
  <ForcedCascade
    items={artisansItems}
    title={<>Nos <span className="text-primary">Artisans</span></>}
    label="L'ÂME DERRIÈRE L'ŒUVRE"
  />
);

/* ─── SECTION 5: PIÈCES PHARES (cascade) ─── */
const featuredProducts = [
  { id: 'p1', name: 'Masque Baoulé ébène', artisan: 'Kofi Asante', price: 45000, category: 'Sculpture', badge: 'COUP DE CŒUR', image: catSculpture },
  { id: 'p2', name: 'Panier décoratif Abissa', artisan: 'Aya Coulibaly', price: 18000, category: 'Tressage', badge: null, image: catTressage },
  { id: 'p3', name: 'Vase Sénoufo terracotta', artisan: 'Fatou Diallo', price: 28500, category: 'Poterie', badge: 'NOUVEAU', image: catPottery },
  { id: 'p4', name: 'Village au crépuscule', artisan: 'Abou Koné', price: 65000, category: 'Peinture', badge: null, image: catPeinture },
  { id: 'p5', name: 'Statue Dan ancestrale', artisan: 'Kofi Asante', price: 72000, category: 'Sculpture', badge: 'PIÈCE RARE', image: catSculpture },
];

const productsItems = featuredProducts.map((product) => ({
  id: product.id,
  content: (
    <div className="flex flex-col gap-4" style={{ height: '55vh' }}>
      <div className="relative flex-1 rounded-[2rem] overflow-hidden">
        <img
          src={product.image}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.95) sepia(0.15)' }}
          alt={product.name}
        />
        {product.badge && (
          <div className="absolute top-5 left-5">
            <span className="glass-card px-4 py-2 rounded-full text-[9px] uppercase tracking-widest text-primary font-sans font-bold">
              {product.badge}
            </span>
          </div>
        )}
      </div>
      <div className="bg-surface-container-low rounded-[1.5rem] p-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 font-sans">
            {product.category}
          </p>
          <h3 className="font-serif text-xl italic text-inverse-surface truncate">{product.name}</h3>
          <p className="font-serif text-2xl text-primary mt-1">
            {product.price.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light text-primary-foreground flex items-center justify-center text-2xl flex-shrink-0"
          aria-label="Ajouter au panier"
        >
          +
        </button>
      </div>
    </div>
  ),
}));

const PinnedProductsSection = () => (
  <ForcedCascade
    items={productsItems}
    title={<>Pièces <span className="text-primary">Phares</span></>}
    label="NOS CRÉATIONS · COUP DE CŒUR"
  />
);

/* ─── SECTION 6: ÉDITO CULTUREL ─── */
const EditoSection = () => (
  <ScrollReveal variants={scaleReveal}>
  <section
    className="relative py-16 px-6 texture-overlay"
    style={{ backgroundColor: "#1A2D1A" }}
  >
    <span className="font-serif text-3xl italic text-primary-foreground block">L'Héritage</span>
    <span className="label-caps text-[10px] text-primary-foreground/60 mt-2 block">
      Chaque pièce, une histoire
    </span>
    <FadeInText
      text="À San Pedro, l'artisanat n'est pas un métier. C'est un langage transmis de génération en génération, façonné par des mains expertes qui transforment la matière brute en œuvres d'exception."
      className="text-sm font-light leading-relaxed text-on-surface-variant mt-4 max-w-sm"
      baseColor="rgba(255,255,255,0.25)"
      targetColor="rgb(255,255,255)"
    />
    <blockquote className="font-serif text-3xl italic text-primary-foreground mt-6 leading-snug">
      <span style={{ color: "#4A7A4A" }}>“</span>Chaque pièce porte l'histoire de tout un peuple.<span style={{ color: "#4A7A4A" }}>”</span>
    </blockquote>
    <p className="label-caps text-[10px] text-primary-foreground/50 mt-2 tracking-widest">
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
        className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-primary-foreground/20 text-primary-foreground uppercase tracking-widest text-[0.7rem] font-bold hover:bg-primary-foreground/10 transition-colors"
      >
        Nos Artisans
      </Link>
    </div>
  </section>
  </ScrollReveal>
);

/* ─── SECTION 7: NEWSLETTER ─── */
const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-12 px-6 pb-16 gradient-newsletter">
      <ScrollReveal>
        <span className="label-caps text-[10px] text-muted-foreground mb-2 block">Restez connecté</span>
        <h2 className="font-serif text-2xl text-inverse-surface">L'art au bout des doigts</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
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
      </ScrollReveal>
    </section>
  );
};

/* ─── PAGE ─── */
const HomePage = () => {
  const heroRef = useThemeSection<HTMLDivElement>('dark');
  const metiersRef = useThemeSection<HTMLDivElement>('light');
  const artisansRef = useThemeSection<HTMLDivElement>('forest');
  const productsRef = useThemeSection<HTMLDivElement>('light');
  const storyRef = useThemeSection<HTMLDivElement>('terracotta');

  return (
    <AppShell>
      <div ref={heroRef}><HeroSection /></div>
      <StatsBento />
      <Cascade />
      <div ref={metiersRef}><MetiersSection /></div>
      <div ref={artisansRef}><ArtisansSection /></div>
      <div ref={productsRef}><PinnedProductsSection /></div>
      <div ref={storyRef}><EditoSection /></div>
      <NewsletterSection />
    </AppShell>
  );
};

export default HomePage;
