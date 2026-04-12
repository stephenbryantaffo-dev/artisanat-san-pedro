import AppShell from "@/components/AppShell";

const stats = [
  { value: "240+", label: "Artisans accompagnés" },
  { value: "1 200+", label: "Œuvres référencées" },
  { value: "35", label: "Artisans formés Phase 1" },
  { value: "17", label: "Pays acheteurs" },
  { value: "6", label: "Corps de métiers" },
  { value: "2026", label: "Année de lancement" },
];

const pillars = [
  { icon: "💰", title: "Économique", desc: "Générer des revenus durables pour les artisans en les connectant aux marchés locaux et internationaux via une plateforme numérique moderne." },
  { icon: "🎭", title: "Culturel", desc: "Préserver et valoriser le patrimoine artisanal ivoirien en documentant les techniques ancestrales et en soutenant leur transmission." },
  { icon: "✈️", title: "Touristique", desc: "Positionner San Pedro comme destination de tourisme culturel en attirant les acheteurs internationaux et les amateurs d'art." },
];

const partners = [
  "Chambre des Métiers de San Pedro",
  "Conseil Citoyen",
  "SELLARS AFRICA",
  "Mairie de San Pedro",
  "AMF-UEMOA",
];

const AboutPage = () => (
  <AppShell>
    {/* Hero */}
    <div className="bg-inverse-surface px-6 py-16">
      <p className="text-[10px] uppercase tracking-widest text-primary mb-2">PROGRAMME PACTE</p>
      <h1 className="font-serif text-4xl italic text-primary-foreground">Notre Mission</h1>
      <p className="text-sm text-primary-foreground/70 font-light leading-relaxed mt-4 max-w-sm">
        PACTE — Partenariat pour une Administration Citoyenne et la Transformation de l'État — porte la plateforme numérique de l'artisanat de San Pedro pour valoriser et promouvoir le patrimoine artisanal, générer des revenus durables pour les artisans, et les connecter aux marchés locaux et internationaux.
      </p>
    </div>

    {/* Impact Stats */}
    <div className="px-6 py-10">
      <h2 className="font-serif text-2xl italic mb-6">Impact à ce jour</h2>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-container-low rounded-xl p-4 text-center">
            <p className="font-serif text-2xl text-primary">{s.value}</p>
            <p className="text-[8px] uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Pillars */}
    <div className="px-6 py-8 bg-surface-container-low space-y-4">
      <h2 className="font-serif text-2xl italic">Nos Piliers</h2>
      {pillars.map((p) => (
        <div key={p.title} className="bg-background rounded-[1.5rem] p-5">
          <span className="text-2xl">{p.icon}</span>
          <h3 className="font-serif text-lg italic mt-2">{p.title}</h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed mt-2">{p.desc}</p>
        </div>
      ))}
    </div>

    {/* Partners */}
    <div className="px-6 py-8">
      <h2 className="font-serif text-xl italic mb-6">Nos Partenaires</h2>
      <div className="space-y-3">
        {partners.map((name) => (
          <div key={name} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
              {name.charAt(0)}
            </div>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="pb-16" />
  </AppShell>
);

export default AboutPage;
