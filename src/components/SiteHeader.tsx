import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  Search, 
  Phone, 
  Info, 
  User, 
  LogOut,
  Shield,
  Building2,
  Users,
  BookOpen,
  HelpCircle,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const { t, lang, setLang, getLanguageName, getAllLanguages } = useLang();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status
  useEffect(() => {
    const checkAdminStatus = () => {
      const isAuthenticated = sessionStorage.getItem("admin_authenticated") === "true";
      const username = sessionStorage.getItem("admin_username");
      const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
      setIsAdmin(isAuthenticated && username === ADMIN_USERNAME);
    };

    checkAdminStatus();
    
    // Listen for storage changes (more efficient than polling)
    const handleStorageChange = () => {
      checkAdminStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-window storage changes
    const handleCustomStorageChange = () => {
      checkAdminStatus();
    };
    
    window.addEventListener('adminStatusChange', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminStatusChange', handleCustomStorageChange);
    };
  }, []);

  const navigation = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('schemes'), href: '/schemes', icon: FileText },
    { name: t('services'), href: '/services', icon: Search },
    { name: t('about'), href: '/about', icon: Info },
    { name: t('contact'), href: '/contact', icon: Phone },
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang as any);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 dark:border-orange-900 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo with Text */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Government Building Icon Logo */}
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 dark:from-orange-600 dark:via-yellow-600 dark:to-orange-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Building2 className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              {/* India Flag Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-md">
                <span className="text-xs">🇮🇳</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600"
                      : "text-gray-700 dark:text-gray-300 hover:text-orange-700 dark:hover:text-orange-400 hover:bg-orange-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <Select value={lang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[90px] h-9 border-orange-500 hover:border-orange-500 dark:hover:border-orange-400">
                <div className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {getAllLanguages().map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <span className="text-sm">{language.nativeName}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span className="text-xs">{user.email?.split('@')[0]}</span>
                </Badge>
                
                {/* User Dashboard */}
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{t('dashboard')}</span>
                  </Button>
                </Link>
                
                {/* Admin Access - Check session-based authentication */}
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Button>
                  </Link>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {t('sign_out')}
                  </span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                  <User className="w-4 h-4 mr-1" />
                  {t('sign_in')}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-orange-100 dark:border-orange-900 bg-white dark:bg-gray-900 py-4 animate-fade-in-up">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 border-l-4 border-orange-700 dark:border-orange-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-700 dark:hover:text-orange-400 hover:bg-orange-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile User Actions */}
              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-700 dark:hover:text-orange-400 hover:bg-orange-50 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>{lang === 'en' ? 'Dashboard' : lang === 'hi' ? 'डैशबोर्ड' : 'डॅशबोर्ड'}</span>
                </Link>
              )}
              
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-700 dark:hover:text-orange-400 hover:bg-orange-50 rounded-lg"
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Government Notice Bar */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 dark:from-yellow-600 dark:via-orange-600 dark:to-orange-700 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <span className="flex items-center space-x-1">
              <HelpCircle className="w-3 h-3" />
              <span>
                {lang === 'en' ? 'Helpline: 1077 (24x7)' : 
                 lang === 'hi' ? 'हेल्पलाइन: 1077 (24x7)' : 
                 lang === 'mr' ? 'हेल्पलाइन: 1077 (24x7)' : 
                 'Helpline: 1077 (24x7)'}
              </span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>
                {lang === 'en' ? 'Free Government Services' : 
                 lang === 'hi' ? 'मुफ्त सरकारी सेवाएं' : 
                 lang === 'mr' ? 'मोफत सरकारी सेवा' : 
                 'Free Government Services'}
              </span>
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>
                {lang === 'en' ? 'Serving All India' : 
                 lang === 'hi' ? 'पूरे भारत की सेवा' : 
                 lang === 'mr' ? 'संपूर्ण भारतासाठी' : 
                 'Serving All India'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}