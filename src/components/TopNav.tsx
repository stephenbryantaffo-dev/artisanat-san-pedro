import { Menu, Sparkles } from "lucide-react";

const TopNav = () => {
  return (
    <header className="glass-card fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors">
          <Menu className="w-[18px] h-[18px] text-inverse-surface" />
        </button>
        <span className="font-serif text-base italic text-inverse-surface tracking-tight">
          The Curator
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 bg-accent/50 text-primary rounded-full px-3 py-1.5">
          <Sparkles className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Chat IA</span>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
