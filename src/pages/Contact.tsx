import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, Globe, AlertTriangle, Building2, UserCheck, MapPin, Clock, ExternalLink } from "lucide-react";

export default function Contact() {
  const { t } = useLang();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log("Contact form submitted", data);
    toast({ title: t("contactTitle"), description: "Submitted successfully (demo)." });
    reset();
  });

  const canonicalHref = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Helmet>
        <title>MahaHelp Desk | Contact</title>
        <meta name="description" content="Contact MahaHelp Desk team for support or questions. Phone and email available." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>

      <section className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{t("contactTitle")}</h1>
          <p className="text-muted-foreground mb-4">{t("tagline")}</p>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t("name")}</label>
              <Input {...register("name")} required />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" {...register("email")} required />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t("message")}</label>
              <Textarea rows={5} {...register("message")} required />
            </div>
            <div>
              <Button type="submit" variant="hero">{t("submit")}</Button>
            </div>
          </form>
        </div>

        <aside className="bg-card border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3">{t("support")}</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
              <a href="tel:+912212345678" className="text-sm text-primary hover:underline">
                022-1234-5678
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
              <a href="mailto:support@mahahelp.in" className="text-sm text-primary hover:underline">
                support@mahahelp.in
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Maharashtra Government Contacts Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">{t("govContacts")}</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Chief Minister's Office */}
          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 mr-3 text-primary" />
              <h3 className="text-lg font-semibold">{t("cmOffice")}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                <a href="tel:+912222024200" className="text-primary hover:underline">
                  022-2202-4200
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <a href="mailto:cm@maharashtra.gov.in" className="text-primary hover:underline">
                  cm@maharashtra.gov.in
                </a>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Mantralaya+Mumbai+400032" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  Mantralaya, Mumbai - 400032
                </a>
              </div>
            </div>
          </div>

          {/* District Collectorate */}
          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 mr-3 text-primary" />
              <h3 className="text-lg font-semibold">{t("collectorate")}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                <a href="tel:+912222660707" className="text-primary hover:underline">
                  022-2266-0707
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <a href="mailto:collector@maharashtra.gov.in" className="text-primary hover:underline">
                  collector@maharashtra.gov.in
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>Mon-Fri: 10:30 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Citizen Helpline */}
          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 mr-3 text-primary" />
              <h3 className="text-lg font-semibold">{t("helpline1077")}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <AlertTriangle className="w-4 h-4 mr-2 text-muted-foreground" />
                <a href="tel:1077" className="text-primary hover:underline font-semibold">
                  1077 (Toll Free)
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{t("helpline1077Desc")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Services */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-6">{t("emergencyServices")}</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <a href="tel:100" className="bg-red-50 border border-red-200 rounded-lg p-4 text-center hover:bg-red-100 transition-colors cursor-pointer">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="font-semibold text-red-800">{t("police")}</p>
            </a>
            <a href="tel:101" className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center hover:bg-orange-100 transition-colors cursor-pointer">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-semibold text-orange-800">{t("fire")}</p>
            </a>
            <a href="tel:108" className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors cursor-pointer">
              <Phone className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold text-green-800">{t("ambulance")}</p>
            </a>
            <a href="tel:1070" className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors cursor-pointer">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-blue-800">{t("disasterMgmt")}</p>
            </a>
          </div>
        </div>

        {/* Online Services */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-6">{t("onlineServices")}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <a 
              href="https://aaplesarkar.maharashtra.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-primary" />
                  <h4 className="text-lg font-semibold">{t("aaplePortal")}</h4>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t("aaplePortalDesc")}</p>
              <p className="text-sm font-mono text-primary hover:underline">aaplesarkar.maharashtra.gov.in</p>
            </a>
            
            <a 
              href="https://msrtc.maharashtra.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-primary" />
                  <h4 className="text-lg font-semibold">{t("rtcPortal")}</h4>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t("rtcPortalDesc")}</p>
              <p className="text-sm font-mono text-primary hover:underline">msrtc.maharashtra.gov.in</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
