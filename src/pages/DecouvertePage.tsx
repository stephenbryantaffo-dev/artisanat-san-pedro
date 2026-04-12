import AppShell from "@/components/AppShell";
import { allArtisans } from "@/data/artisans";

import catSculpture from "@/assets/cat-sculpture.jpg";
import catTissage from "@/assets/cat-tissage.jpg";

const articles = [
  {
    image: catSculpture,
    category: "Histoire",
    title: "L'Art de la Sculpture Baoulé",
    extract: "Depuis des siècles, le peuple Baoulé sculpte le bois avec une précision spirituelle. Chaque masque est le réceptacle d'un esprit protecteur, chaque figurine un lien entre le monde visible et l'invisible. Découvrez comment cette tradition millénaire survit et se réinvente à San Pedro.",
  },
  {
    image: catTissage,
    category: "Technique",
    title: "Le Bogolan : un Tissu qui Parle",
    extract: "Teint à la boue fermentée et aux décoctions de feuilles, le bogolan est un langage textile. Chaque motif géométrique porte un message — fertilité, bravoure, sagesse. Les tisserands de San Pedro perpétuent cet art avec des teintures 100% naturelles.",
  },
  {
    image: allArtisans[0].avatar,
    category: "Portrait",
    title: "Kofi Asante : 30 Ans de Bois et d'Âme",
    extract: "Depuis 1998, Kofi Asante transforme l'ébène en émotion. Rencontre avec un maître sculpteur dont les mains racontent l'histoire de trois générations d'artisans dans la région de San Pedro.",
  },
];

const events = [
  { day: "5", month: "AVR", name: "Festival de l'Artisanat de San Pedro", location: "Place du Marché", desc: "3 jours de démonstrations, ventes et ateliers" },
  { day: "19", month: "AVR", name: "Atelier Poterie — Démonstration", location: "Boutique PACTE", desc: "Apprenez les techniques de la terre cuite Bété" },
  { day: "3", month: "MAI", name: "Exposition Sculptures Baoulé", location: "Maison de la Culture", desc: "20 œuvres majeures de la collection régionale" },
];

const DecouvertePage = () => (
  <AppShell>
    {/* Hero */}
    <div className="bg-inverse-surface py-16 px-6 text-center">
      <p className="text-[10px] uppercase tracking-widest text-primary mb-2">L'HÉRITAGE</p>
      <h1 className="font-serif text-4xl italic text-primary-foreground">
        La Culture Vivante de<br />San Pedro
      </h1>
      <p className="text-sm text-primary-foreground/60 font-light mt-3 max-w-xs mx-auto">
        L'artisanat ivoirien à travers ses traditions, ses techniques et ses maîtres.
      </p>
    </div>

    {/* Articles */}
    <div className="px-6 py-10 space-y-6">
      {articles.map((a) => (
        <article key={a.title} className="bg-background rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(14,13,13,0.04)]">
          <img src={a.image} alt={a.title} className="w-full aspect-[16/7] object-cover sepia-[0.15]" />
          <div className="p-6">
            <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-[9px] uppercase tracking-widest text-primary backdrop-blur-sm">
              {a.category}
            </span>
            <h2 className="font-serif text-xl italic leading-snug mt-3">{a.title}</h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mt-2">{a.extract}</p>
            <button className="text-primary text-[10px] uppercase tracking-widest font-bold mt-4 underline">
              Lire la suite →
            </button>
          </div>
        </article>
      ))}
    </div>

    {/* Agenda */}
    <div className="px-6 py-8 bg-surface-container-low">
      <h2 className="font-serif text-2xl italic">Agenda Culturel 2026</h2>
      <p className="text-[10px] uppercase text-muted-foreground tracking-widest mb-6">Événements à venir</p>
      <div className="space-y-4">
        {events.map((e) => (
          <div key={e.name} className="flex items-center gap-4 bg-background rounded-[1.5rem] p-4">
            <div className="bg-primary text-primary-foreground rounded-xl p-3 text-center flex-shrink-0 w-14">
              <span className="font-serif text-xl font-bold block">{e.day}</span>
              <span className="text-[8px] uppercase">{e.month}</span>
            </div>
            <div>
              <p className="text-sm font-bold">{e.name}</p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{e.location}</p>
              <p className="text-[10px] text-muted-foreground font-light">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="pb-32" />
  </AppShell>
);

export default DecouvertePage;
