import heroImg from "@/assets/hero-artisan.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <img
        src={heroImg}
        alt="West African artisan workshop with handcrafted sculptures and pottery"
        className="absolute inset-0 w-full h-full object-cover img-warm"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent" />
      <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
        <div className="max-w-2xl animate-fade-in">
          <span className="label-caps text-primary-foreground/70 mb-4 block">
            Programme PACTE · San Pedro, Côte d'Ivoire
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground leading-[1.1] mb-6">
            L'art de nos
            <em className="block font-light"> mains ancestrales</em>
          </h1>
          <p className="font-sans text-primary-foreground/70 text-base md:text-lg max-w-md mb-8 leading-relaxed">
            Découvrez les créations uniques des artisans de San Pedro. Chaque pièce raconte une histoire de savoir-faire transmis de génération en génération.
          </p>
          <div className="flex gap-4">
            <Button variant="cta" size="lg">
              Explorer la galerie
            </Button>
            <Button variant="secondary" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Rencontrer nos artisans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
