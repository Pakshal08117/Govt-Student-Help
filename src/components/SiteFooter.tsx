import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

export default function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded bg-gradient-hero" aria-hidden />
            <span className="font-semibold">{t("appName")}</span>
          </div>
          <p className="text-sm text-muted-foreground text-balance">
            {t("heroDesc")}
          </p>
        </div>

        <nav className="grid gap-2">
          <span className="text-sm font-medium">Quick Links</span>
          <Link className="text-sm text-muted-foreground hover:text-primary" to="/">{t("home")}</Link>
          <Link className="text-sm text-muted-foreground hover:text-primary" to="/services">{t("services")}</Link>
          <Link className="text-sm text-muted-foreground hover:text-primary" to="/about">{t("about")}</Link>
          <Link className="text-sm text-muted-foreground hover:text-primary" to="/contact">{t("contact")}</Link>
        </nav>

        <div className="text-sm">
          <div className="font-medium mb-2">© {new Date().getFullYear()} MahaHelp Desk</div>
          <div className="text-muted-foreground">Made for citizens of Maharashtra</div>
        </div>
      </div>
    </footer>
  );
}
