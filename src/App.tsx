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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
