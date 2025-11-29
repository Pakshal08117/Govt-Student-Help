import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { cleanupAuthState } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { to: "/", key: "home" },
  { to: "/services", key: "services" },
  { to: "/schemes", key: "schemes" },
  { to: "/document-helper", key: "documentHelper" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
];

const adminNavItem = { to: "/admin", key: "adminPanel" };

function LanguageToggle() {
  const { lang, toggle, t } = useLang();
  return (
    <Button variant="secondary" size="sm" onClick={toggle} aria-label="Toggle language">
      {t("lang")} {lang === "en" ? "→" : "→"}
    </Button>
  );
}

export default function SiteHeader() {
  const { t, lang, toggle } = useLang();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    try {
      cleanupAuthState();
      await signOut();
    } finally {
      window.location.href = "/auth";
    }
  };

  const getUserDisplayName = () => {
    if (profile?.display_name) return profile.display_name;
    if (profile?.username) return profile.username;
    return user?.email?.split('@')[0] || 'User';
  };

  const getWelcomeMessage = () => {
    const name = profile?.display_name || profile?.username || user?.email?.split('@')[0] || '';
    return name ? `Welcome, ${name}` : 'Welcome';
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group transition-all duration-200 hover:scale-105">
          <div className="relative">
            <img 
              src="/maha-help-logo.svg" 
              alt="MahaHelp Desk Logo" 
              className="h-10 w-10 transition-all duration-300 group-hover:rotate-3 group-hover:drop-shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm scale-110"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-yellow-600 transition-all duration-200">
              {t("appName")}
            </span>
            <span className="text-xs text-muted-foreground font-medium opacity-75 group-hover:opacity-100 transition-opacity duration-200">
              {t("tagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-smooth ${
                  isActive || location.pathname === item.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              end
            >
              {t(item.key)}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to={adminNavItem.to}
              className={({ isActive }) =>
                `text-sm transition-smooth ${
                  isActive || location.pathname === adminNavItem.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              end
            >
              {t(adminNavItem.key)}
            </NavLink>
          )}
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary hidden lg:inline">
                {getWelcomeMessage()}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>Logout</Button>
            </div>
          ) : (
            <Button asChild variant="secondary" size="sm">
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>{t("appName")}</SheetTitle>
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className="text-base" end>
                    {t(item.key)}
                  </NavLink>
                ))}
                {user && (
                  <NavLink to={adminNavItem.to} className="text-base" end>
                    {t(adminNavItem.key)}
                  </NavLink>
                )}
                {user ? (
                  <>
                    <div className="text-sm font-medium text-primary border-b pb-2 mb-2">
                      {getWelcomeMessage()}
                    </div>
                    <Button variant="outline" onClick={handleSignOut}>Logout</Button>
                  </>
                ) : (
                  <Button asChild variant="secondary">
                    <Link to="/auth">Login</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
