import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import Produtos from "./pages/Produtos";
import ProdutoPage from "./pages/ProdutoPage";
import Servicos from "./pages/Servicos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** Exibe toast "Site em construção" ao entrar no site e ao trocar de página */
function ConstructionAlert() {
  const location = useLocation();

  useEffect(() => {
    toast.info("Site em construção", {
      description: "Estamos melhorando sua experiência. Obrigado pela visita!",
      duration: 4000,
    });
  }, [location.pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollToTop />
        <ConstructionAlert />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/galeria" element={<Projetos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoPage />} />
          <Route path="/servicos" element={<Servicos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
