import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
