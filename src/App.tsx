import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChooseDriver from "./pages/ChooseDriver";
import TrackCar from "./pages/TrackCar";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminInsight from "./pages/admin/AdminInsight";
import AdminReimburse from "./pages/admin/AdminReimburse";
import AdminInbox from "./pages/admin/AdminInbox";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./components/home/HowItWorks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/car/:id" element={<CarDetail />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/choose-driver" element={<ChooseDriver />} />
              <Route path="/track/:bookingId" element={<TrackCar />} />
              <Route path="/payment" element={<Payment />} />
              <Route
                path="/confirmation/:bookingId"
                element={<Confirmation />}
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/cars" element={<AdminCars />} />
              <Route path="/admin/insight" element={<AdminInsight />} />
              <Route path="/admin/reimburse" element={<AdminReimburse />} />
              <Route path="/admin/inbox" element={<AdminInbox />} />
              <Route path="/admin/calendar" element={<AdminCalendar />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
