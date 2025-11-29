import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { HelmetProvider } from "react-helmet-async";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Apply from "./pages/Apply";
import Tracking from "./pages/Tracking";
import Schemes from "./pages/Schemes";
import AdminPanel from "./pages/AdminPanel";
import DocumentHelper from "./pages/DocumentHelper";
import { ThemeProvider } from "./components/ThemeProvider";
import { RealtimeProvider } from "./contexts/RealtimeContext";
import RealtimeIndicator from "./components/RealtimeIndicator";
import AIAssistant from "./components/AIAssistant";
import { dataSyncService } from "./services/dataSyncService";

const queryClient = new QueryClient();

// Initialize data sync service
dataSyncService.start(30); // Auto-update every 30 minutes

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="maha-help-theme">
        <AuthProvider>
          <RealtimeProvider>
            <LanguageProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <SiteHeader />
                <main className="flex-1">
                  <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    } />
                    <Route path="/services" element={
                      <ProtectedRoute>
                        <Services />
                      </ProtectedRoute>
                    } />
                    <Route path="/about" element={
                      <ProtectedRoute>
                        <About />
                      </ProtectedRoute>
                    } />
                    <Route path="/contact" element={
                      <ProtectedRoute>
                        <Contact />
                      </ProtectedRoute>
                    } />
                    <Route path="/apply" element={
                      <ProtectedRoute>
                        <Apply />
                      </ProtectedRoute>
                    } />
                    <Route path="/tracking" element={
                      <ProtectedRoute>
                        <Tracking />
                      </ProtectedRoute>
                    } />
                    <Route path="/schemes" element={
                      <ProtectedRoute>
                        <Schemes />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminPanel />
                      </ProtectedRoute>
                    } />
                    <Route path="/document-helper" element={
                      <ProtectedRoute>
                        <DocumentHelper />
                      </ProtectedRoute>
                    } />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <SiteFooter />
                <RealtimeIndicator />
                <AIAssistant />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
          </RealtimeProvider>
      </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
