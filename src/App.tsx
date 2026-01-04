import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChooseDriver from "./pages/ChooseDriver";
import TrackCar from "./pages/TrackCar";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/choose-driver" element={<ChooseDriver />} />
          <Route path="/track/:bookingId" element={<TrackCar />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
