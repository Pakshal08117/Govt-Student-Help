import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { EssentialModeProvider } from '@/contexts/EssentialModeContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AIAssistant from '@/components/AIAssistant';

// Pages
import Index from '@/pages/Index';
import Schemes from '@/pages/Schemes';
import SchemeDetail from '@/pages/SchemeDetail';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Auth from '@/pages/Auth';
import Apply from '@/pages/Apply';
import Tracking from '@/pages/Tracking';
import UserDashboard from '@/pages/UserDashboard';
import AdminPanel from '@/pages/AdminPanel';
import DocumentHelper from '@/pages/DocumentHelper';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <EssentialModeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <SiteHeader />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/schemes" element={<Schemes />} />
                      <Route path="/schemes/:id" element={<SchemeDetail />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/apply" element={<Apply />} />
                      <Route path="/tracking" element={<Tracking />} />
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/document-helper" element={<DocumentHelper />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <SiteFooter />
                  <AIAssistant />
                  <Toaster 
                    position="top-right" 
                    richColors 
                    closeButton
                    toastOptions={{
                      style: {
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        color: '#374151',
                      },
                    }}
                  />
                </div>
              </Router>
            </AuthProvider>
          </LanguageProvider>
        </EssentialModeProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;