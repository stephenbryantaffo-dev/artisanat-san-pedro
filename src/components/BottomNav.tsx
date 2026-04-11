import { Home, ShoppingBag, Users, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Accueil", path: "/" },
  { icon: ShoppingBag, label: "Boutique", path: "/boutique" },
  { icon: Users, label: "Artisans", path: "/artisans" },
  { icon: User, label: "Profil", path: "/profil" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="glass-dark fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] pb-6 pt-3 px-6"
         style={{ boxShadow: "0 -10px 40px rgba(14,13,13,0.04)" }}>
      <div className="flex justify-around items-center">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary rounded-full px-4 py-2"
                  : "text-primary-foreground/60 py-2 px-2"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] uppercase tracking-widest font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
