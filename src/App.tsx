import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // 🔁 Switched from BrowserRouter to HashRouter
import { SchoolProvider, useSchool } from "@/contexts/SchoolContext";
import { BottomNavigation } from "@/components/BottomNavigation";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Marks from "./pages/Marks";
import Messages from "./pages/Messages";
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useSchool();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/events" element={<Events />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNavigation />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter> {/* 🔁 This fixes 404s on GitHub Pages */}
        <SchoolProvider>
          <AppContent />
        </SchoolProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
