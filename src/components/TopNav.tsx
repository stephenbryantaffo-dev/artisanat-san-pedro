import { useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import NavigationDrawer from "@/components/NavigationDrawer";

const TopNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #99420d, #2D4A2D)",
          zIndex: 999,
          pointerEvents: "none",
        }}
      />
      <header className="glass-card fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
          >
            <Menu className="w-[18px] h-[18px] text-inverse-surface" />
          </button>
          <span className="font-serif text-base italic text-inverse-surface tracking-tight">
            Artisanat San Pedro
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-accent/50 text-primary rounded-full px-3 py-1.5">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Chat IA</span>
          </button>
        </div>
      </header>

      <NavigationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default TopNav;
