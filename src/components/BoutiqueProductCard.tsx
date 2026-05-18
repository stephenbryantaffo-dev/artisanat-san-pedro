import { Heart, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/products";
import { categoryAccent } from "@/lib/categoryColors";
import { useTilt } from "@/hooks/useTilt";

interface BoutiqueProductCardProps {
  product: Product;
}

const BoutiqueProductCard = ({ product }: BoutiqueProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const accent = categoryAccent(product.category);
  const { ref, onMouseMove, onMouseLeave } = useTilt(12);

  const handleCardClick = () => {
    navigate(`/boutique/${product.slug}`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      className="rounded-bento overflow-hidden bg-background cursor-pointer shadow-luxury"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover brightness-[0.95] sepia-[0.1] transition-transform duration-500 hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 glass-card px-2.5 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold text-inverse-surface">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 glass-card w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        >
          <Heart
            className={`w-3.5 h-3.5 ${liked ? "fill-primary text-primary" : "text-inverse-surface"}`}
          />
        </button>
      </div>
      <div className="p-3 space-y-1">
        <span
          className="text-[8px] uppercase tracking-widest font-semibold"
          style={{ color: accent.hex }}
        >
          {product.category}
        </span>
        <h3 className="font-serif text-sm leading-tight line-clamp-2 text-inverse-surface">
          {product.name}
        </h3>
        <p className="text-[9px] text-muted-foreground">{product.artisan}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.round(product.rating)
                  ? "fill-primary text-primary"
                  : "text-border"
              }`}
            />
          ))}
          <span className="text-[9px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-serif text-primary text-base">
            {product.price.toLocaleString("fr-FR")} <span className="text-[9px]">FCFA</span>
          </span>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light flex items-center justify-center text-primary-foreground hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoutiqueProductCard;
