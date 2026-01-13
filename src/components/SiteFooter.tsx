import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

export default function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="border-t mt-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 via-white to-green-500 flex items-center justify-center" aria-hidden>
              <span className="text-xs font-bold text-orange-600">G&S</span>
            </div>
            <span className="font-semibold">{t("appName")}</span>
          </div>
          <p className="text-sm text-muted-foreground text-balance mb-3">
            {t("tagline")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("heroDesc")}
          </p>
        </div>

        {/* User Categories */}
        <div className="grid gap-2">
          <span className="text-sm font-medium">{t("forWhom") || "Who is this for?"}</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-lg">🎓</span> {t("students") || "Students"}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-lg">🧑‍💼</span> {t("citizens") || "Citizens"}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-lg">🏛️</span> {t("schemeApplicants") || "Scheme Seekers"}
          </div>
        </div>

        <nav className="grid gap-2">
          <span className="text-sm font-medium">{t("quickLinks") || "Quick Links"}</span>
          <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" to="/">{t("home")}</Link>
          <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" to="/services">{t("services")}</Link>
          <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" to="/schemes">{t("schemes")}</Link>
          <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" to="/about">{t("about")}</Link>
          <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" to="/contact">{t("contact")}</Link>
        </nav>

        <div className="text-sm">
          <div className="font-medium mb-2">© {new Date().getFullYear()} {t("appName")}</div>
          <div className="text-muted-foreground mb-2">{t("madeFor") || "Made for students and citizens across India"}</div>
          {/* Single Line Footer Information */}
          <div className="text-xs text-muted-foreground/70 mt-4 p-2 bg-muted/50 rounded flex items-center justify-between">
            <span className="font-medium">{t("dataSource") || "Data from"}</span>
            <div className="flex items-center gap-2">
              <span>data.gov.in</span>
              <span>•</span>
              <span>india.gov.in</span>
              <span>•</span>
              <span>scholarships.gov.in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
