import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ImportScreen from "@/pages/ImportScreen";
import RecipeCardScreen from "@/pages/RecipeCardScreen";
import GroceryListScreen from "@/pages/GroceryListScreen";
import CookModeScreen from "@/pages/CookModeScreen";
import HistoryScreen from "@/pages/HistoryScreen";
import PaywallScreen from "@/pages/PaywallScreen";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="max-w-lg mx-auto relative">
          <Routes>
            <Route path="/" element={<ImportScreen />} />
            <Route path="/recipe/:id" element={<RecipeCardScreen />} />
            <Route path="/grocery/:id" element={<GroceryListScreen />} />
            <Route path="/cook/:id" element={<CookModeScreen />} />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="/paywall" element={<PaywallScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
