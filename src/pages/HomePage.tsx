import { useState, useEffect } from "react";
import { Search, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { staggerContainer, staggerItem, slideLeft, scaleReveal } from "../lib/motionVariants";
import { lenisInstance } from "../hooks/useLenis";
import { FadeInText } from "../components/ui/FadeInText";
import { Cascade } from "../components/ui/Cascade";

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
const HeroSection = () => {
  const heroRef = useRef(null);

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
    <img
      src={heroImg}
      alt="Artisan sculpteur à San Pedro"
      className="hero-parallax-img absolute inset-0 w-full h-full object-cover will-change-transform"
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

const MetiersSection = () => (
  <section className="py-12 px-6">
    <ScrollReveal variants={slideLeft}>
      <span className="label-caps text-[10px] text-muted-foreground block mb-2">Nos métiers</span>
    </ScrollReveal>
    <ScrollReveal delay={0.1}>
      <h2 className="font-serif text-2xl text-inverse-surface mb-8">Savoir-faire</h2>
    </ScrollReveal>
    <motion.div
      className="grid grid-cols-2 gap-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {categories.map((cat) => {
        const accent = categoryAccent(cat.code);
        return (
          <motion.a
            key={cat.code}
            variants={staggerItem}
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
          </motion.a>
        );
      })}
    </motion.div>
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
  <section className="relative bg-surface-container-low">
    <div className="s-sticky-heading px-6 py-8 bg-surface-container-low">
      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
        NOS CRÉATEURS
      </p>
      <h2 className="font-headline text-3xl italic">
        L&apos;Âme derrière<br />
        <span className="text-primary">l&apos;Œuvre</span>
      </h2>
    </div>
    <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-12">
      {artisans.map((a) => (
        <motion.div
          key={a.slug}
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="min-w-[260px] relative rounded-bento overflow-hidden shrink-0"
        >
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
        </motion.div>
      ))}
    </div>
  </section>
);

/* ─── SECTION 5: PIÈCES POPULAIRES ─── */
const PinnedProductsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scroll + rect.top - window.innerHeight * 0.1;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      if (scroll >= sectionTop && scroll <= sectionTop + sectionHeight) {
        const progress = (scroll - sectionTop) / sectionHeight;
        const maxTranslate = track.scrollWidth - track.offsetWidth;
        track.style.transform = `translateX(${-progress * maxTranslate}px)`;
      }
    };

    lenisInstance?.on('scroll', handleScroll);
    return () => { lenisInstance?.off('scroll', handleScroll); };
  }, []);

  const products = [
    { name: 'Masque Baoulé ébène', artisan: 'Kofi Asante', price: '45 000', category: 'Sculpture', badge: 'COUP DE CŒUR' },
    { name: 'Panier décoratif Abissa', artisan: 'Aya Coulibaly', price: '18 000', category: 'Tressage', badge: null },
    { name: 'Vase Sénoufo terracotta', artisan: 'Fatou Diallo', price: '28 500', category: 'Poterie', badge: 'NOUVEAU' },
    { name: 'Village au crépuscule', artisan: 'Abou Koné', price: '65 000', category: 'Peinture', badge: null },
    { name: 'Statue Dan ancestrale', artisan: 'Kofi Asante', price: '72 000', category: 'Sculpture', badge: 'PIÈCE RARE' },
  ];

  return (
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 mb-8 flex justify-between items-end">
          <div>
            <p className="label-caps text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Nos Créations
            </p>
            <h2 className="font-serif text-3xl italic text-inverse-surface">
              Pièces <span className="text-primary">Phares</span>
            </h2>
          </div>
          <p className="label-caps text-[10px] uppercase tracking-widest text-muted-foreground">
            Faites défiler →
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 px-6"
          style={{ willChange: 'transform', transition: 'transform 0.05s linear', width: 'max-content' }}
        >
          {products.map((product, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 rounded-[1.5rem] overflow-hidden bg-background shadow-luxury"
              style={{ marginTop: i % 2 === 0 ? '0px' : '40px' }}
            >
              <div className="aspect-[3/4] bg-surface-container-low overflow-hidden">
                <img
                  src={`https://source.unsplash.com/400x533/?african,craft,${product.category.toLowerCase()}`}
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.95) sepia(0.15)' }}
                  alt={product.name}
                />
              </div>
              <div className="p-5">
                <p className="text-[9px] uppercase tracking-widest text-primary font-bold mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg italic leading-tight text-inverse-surface">
                  {product.name}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1">{product.artisan}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-serif text-xl text-primary">
                    {product.price} FCFA
                  </span>
                  <button className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light flex items-center justify-center text-primary-foreground font-bold text-lg">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 mt-8 flex gap-2">
          {products.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 bg-border/30 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '20%' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
const HomePage = () => (
  <AppShell>
    <HeroSection />
    <StatsBento />
    <Cascade />
    <MetiersSection />
    <ArtisansSection />
    <PinnedProductsSection />
    <EditoSection />
    <NewsletterSection />
  </AppShell>
);

export default HomePage;
