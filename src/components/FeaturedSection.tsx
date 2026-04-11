import weavingImg from "@/assets/featured-weaving.jpg";
import potteryImg from "@/assets/featured-pottery.jpg";
import sculptureImg from "@/assets/featured-sculpture.jpg";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    label: "Tissage",
    title: "Pagnes Tissés",
    description: "Traditions textiles Bété",
    image: weavingImg,
    count: 24,
  },
  {
    label: "Poterie",
    title: "Céramiques",
    description: "Terres cuites de la région",
    image: potteryImg,
    count: 18,
  },
  {
    label: "Sculpture",
    title: "Bois & Ébène",
    description: "Figurines sculptées main",
    image: sculptureImg,
    count: 31,
  },
];

const FeaturedSection = () => {
  return (
    <section className="bg-surface-container-low py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="label-caps text-primary mb-3 block">Collections</span>
            <h2 className="font-serif text-3xl md:text-4xl text-inverse-surface font-light">
              Savoir-faire <em>d'exception</em>
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 label-caps text-primary hover:gap-3 transition-all">
            Tout voir <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href="#"
              className="group relative rounded-bento overflow-hidden bg-surface-container shadow-luxury"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover img-warm group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="glass-card label-caps text-inverse-surface px-3 py-1.5 rounded-full inline-block mb-3">
                  {cat.count} pièces
                </span>
                <h3 className="font-serif text-2xl text-primary-foreground mb-1">{cat.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{cat.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
