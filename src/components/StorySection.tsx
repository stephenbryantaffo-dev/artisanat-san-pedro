import { Button } from "@/components/ui/button";

const StorySection = () => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="label-caps text-primary mb-4 block">Notre mission</span>
          <h2 className="font-serif text-3xl md:text-5xl text-inverse-surface font-light leading-tight mb-6">
            Préserver les métiers d'art,
            <em className="block">connecter les talents au monde</em>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Le programme PACTE accompagne les artisans de San Pedro dans la valorisation de leur savoir-faire. 
            Chaque achat soutient directement une famille d'artisans et perpétue un héritage culturel inestimable.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="cta" size="lg">
              Découvrir le programme
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
