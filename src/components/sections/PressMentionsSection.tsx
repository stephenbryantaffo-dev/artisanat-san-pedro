import { useRef, useEffect } from "react";
import { lenisInstance } from "@/hooks/useLenis";

const PRESS_NAMES = [
  { name: "Fraternité Matin", weight: "700", style: "normal" },
  { name: "Jeune Afrique", weight: "400", style: "italic" },
  { name: "Africa Business", weight: "700", style: "normal" },
  { name: "RFI Afrique", weight: "400", style: "normal" },
  { name: "Le Patriote", weight: "700", style: "italic" },
  { name: "Côte d'Ivoire Info", weight: "400", style: "normal" },
  { name: "Abidjan.net", weight: "700", style: "normal" },
  { name: "Beaux Arts Magazine", weight: "400", style: "italic" },
];

const PressMentionsSection = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      velocityRef.current = (scroll - lastScrollRef.current) * 0.15;
      lastScrollRef.current = scroll;
    };

    lenisInstance?.on("scroll", handleScroll);

    const animate = () => {
      const base = 0.5;
      xRef.current -= base + velocityRef.current;
      velocityRef.current *= 0.9;

      const inner = innerRef.current;
      if (inner) {
        const half = inner.scrollWidth / 2;
        if (Math.abs(xRef.current) >= half) xRef.current = 0;
        inner.style.transform = `translateX(${xRef.current}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance?.off("scroll", handleScroll);
    };
  }, []);

  const allItems = [...PRESS_NAMES, ...PRESS_NAMES, ...PRESS_NAMES];

  return (
    <section className="py-16 overflow-hidden border-y border-border/10 bg-surface-container-low">
      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-center mb-8">
        Ils parlent de nous
      </p>

      <div className="relative w-full overflow-hidden">
        <div
          ref={innerRef}
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{ width: "max-content" }}
        >
          {allItems.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span
                className="font-serif text-3xl md:text-5xl text-inverse-surface px-8"
                style={{
                  fontWeight: item.weight as React.CSSProperties["fontWeight"],
                  fontStyle: item.style as React.CSSProperties["fontStyle"],
                }}
              >
                {item.name}
              </span>
              <span className="text-primary text-2xl">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressMentionsSection;
