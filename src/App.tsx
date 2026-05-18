import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import HomePage from "./pages/HomePage";
import BoutiquePage from "./pages/BoutiquePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ArtisansPage from "./pages/ArtisansPage";
import ArtisanProfilePage from "./pages/ArtisanProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ClientHubPage from "./pages/ClientHubPage";
import ArtisanDashboardPage from "./pages/ArtisanDashboardPage";
import AIStudioPage from "./pages/AIStudioPage";
import DecouvertePage from "./pages/DecouvertePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AIChatbot from "./components/AIChatbot";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";
import { useLenis } from "./hooks/useLenis";
import { MagneticCursor } from "./components/ui/MagneticCursor";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/boutique" element={<BoutiquePage />} />
          <Route path="/boutique/:slug" element={<ProductDetailPage />} />
          <Route path="/artisans" element={<ArtisansPage />} />
          <Route path="/artisans/:slug" element={<ArtisanProfilePage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/mon-espace" element={<ClientHubPage />} />
          <Route path="/espace-artisan" element={<ArtisanDashboardPage />} />
          <Route path="/espace-artisan/ia-studio" element={<AIStudioPage />} />
          <Route path="/decouverte" element={<DecouvertePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  useLenis();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
          }
        });
      },
      { rootMargin: '-50px 0px' }
    );

    const observe = () => {
      document.querySelectorAll('[data-san-scroll]').forEach((el) => {
        observer.observe(el);
      });
    };

    observe();
    const interval = setInterval(observe, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        {typeof window !== 'undefined' && window.innerWidth > 768 && <MagneticCursor />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
          <AIChatbot />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
