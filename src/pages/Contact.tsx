import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Phone, Mail, Globe, AlertTriangle, Building2, UserCheck, MapPin, Clock, ExternalLink } from "lucide-react";
import GatewayBackground from "@/components/GatewayBackground";

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
        <title>Government & Student Help Platform | Contact</title>
        <meta name="description" content="Contact us for support or questions about government schemes and services across India." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>

      {/* Gateway of India Background */}
      <GatewayBackground />

      <section className="relative container mx-auto px-4 py-10 grid gap-8 md:grid-cols-2 z-10">
        <div>
          <h1 className="text-2xl font-black text-black dark:text-white mb-2">{t("contactTitle")}</h1>
          <p className="text-black dark:text-white font-semibold mb-4">{t("tagline")}</p>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-black text-black dark:text-white">{t("name")}</label>
              <Input {...register("name")} required className="border-orange-500 focus:border-orange-500 font-semibold" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-black text-black dark:text-white">Email</label>
              <Input type="email" {...register("email")} required className="border-orange-500 focus:border-orange-500 font-semibold" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-black text-black dark:text-white">{t("message")}</label>
              <Textarea rows={5} {...register("message")} required className="border-orange-500 focus:border-orange-500 font-semibold" />
            </div>
            <div>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 dark:from-yellow-400 dark:to-orange-500 text-white font-bold">{t("submit")}</Button>
            </div>
          </form>
        </div>

        <aside className="bg-white border-2 border-orange-500 rounded-lg p-6">
          <h2 className="text-lg font-black text-black dark:text-white mb-3">{t("support")}</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-orange-600" />
              <a href="tel:1800111555" className="text-sm text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                1800-111-555 (Toll Free - 24x7)
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-orange-600" />
              <a href="tel:1077" className="text-sm text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                1077 (Citizen Helpline - 24x7)
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-orange-600" />
              <a href="tel:01204200200" className="text-sm text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                0120-4200200 (NSP Helpdesk)
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-orange-600" />
              <a href="mailto:support@govhelpindia.in" className="text-sm text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                support@govhelpindia.in
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-orange-600" />
              <a href="mailto:helpdesk@nsp.gov.in" className="text-sm text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                helpdesk@nsp.gov.in
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Government Contacts Section */}
      <section className="relative container mx-auto px-4 py-10 z-10">
        <h2 className="text-3xl font-black text-black dark:text-white mb-8 text-center">{t("govContacts")}</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Central Government Portal */}
          <div className="bg-white border-2 border-orange-500 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 mr-3 text-orange-600" />
              <h3 className="text-lg font-black text-black dark:text-white">India.gov.in</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Globe className="w-4 h-4 mr-2 text-orange-600" />
                <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                  india.gov.in
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-orange-600" />
                <a href="mailto:webmaster@nic.in" className="text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                  webmaster@nic.in
                </a>
              </div>
              <p className="text-sm text-black dark:text-white font-semibold mt-2">
                National Portal of India - One-stop access to government services
              </p>
            </div>
          </div>

          {/* National Scholarship Portal */}
          <div className="bg-white border-2 border-orange-500 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 mr-3 text-orange-600" />
              <h3 className="text-lg font-black text-black dark:text-white">NSP Helpdesk</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-orange-600" />
                <a href="tel:01204200200" className="text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                  0120-4200200
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-orange-600" />
                <a href="mailto:helpdesk@nsp.gov.in" className="text-black dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                  helpdesk@nsp.gov.in
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-orange-600" />
                <span className="text-black dark:text-white font-semibold">Mon-Sat: 9:30 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Citizen Helpline */}
          <div className="bg-white border-2 border-orange-500 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 mr-3 text-orange-600" />
              <h3 className="text-lg font-black text-black dark:text-white">Citizen Helpline</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                <a href="tel:1800111555" className="text-black dark:text-white font-black hover:text-orange-600 dark:hover:text-orange-400 hover:underline">
                  1800-111-555 (Toll Free)
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-orange-600" />
                <span className="text-black dark:text-white font-semibold">24x7 Citizen Services Helpline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Services */}
        <div className="mt-10">
          <h3 className="text-2xl font-black text-black dark:text-white mb-6 text-center">Emergency Services & Helplines</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <a href="tel:100" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-2xl text-black dark:text-white mb-1">100</p>
              <p className="text-sm font-bold text-black dark:text-white">Police</p>
            </a>
            <a href="tel:101" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-2xl text-black dark:text-white mb-1">101</p>
              <p className="text-sm font-bold text-black dark:text-white">Fire</p>
            </a>
            <a href="tel:102" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-2xl text-black dark:text-white mb-1">102</p>
              <p className="text-sm font-bold text-black dark:text-white">Ambulance</p>
            </a>
            <a href="tel:108" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-2xl text-black dark:text-white mb-1">108</p>
              <p className="text-sm font-bold text-black dark:text-white">Emergency Ambulance</p>
            </a>
            <a href="tel:112" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-2xl text-black dark:text-white mb-1">112</p>
              <p className="text-sm font-bold text-black dark:text-white">National Emergency</p>
            </a>
          </div>

          {/* Additional Helplines */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
            <a href="tel:1091" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">1091</p>
              <p className="text-sm font-bold text-black dark:text-white">Women Helpline</p>
            </a>
            <a href="tel:1098" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">1098</p>
              <p className="text-sm font-bold text-black dark:text-white">Child Helpline</p>
            </a>
            <a href="tel:1070" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">1070</p>
              <p className="text-sm font-bold text-black dark:text-white">Disaster Management</p>
            </a>
            <a href="tel:1800111999" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">1800-111-999</p>
              <p className="text-sm font-bold text-black dark:text-white">Senior Citizen Helpline</p>
            </a>
            <a href="tel:14567" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">14567</p>
              <p className="text-sm font-bold text-black dark:text-white">Cyber Crime Helpline</p>
            </a>
            <a href="tel:155260" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">155260</p>
              <p className="text-sm font-bold text-black dark:text-white">Railway Helpline</p>
            </a>
            <a href="tel:1800111315" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">1800-111-315</p>
              <p className="text-sm font-bold text-black dark:text-white">Kisan Call Centre</p>
            </a>
            <a href="tel:18001801551" className="bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <Phone className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="font-black text-xl text-black dark:text-white mb-1">1800-180-1551</p>
              <p className="text-sm font-bold text-black dark:text-white">Student Helpline</p>
            </a>
          </div>
        </div>

        {/* Online Services */}
        <div className="mt-10">
          <h3 className="text-2xl font-black text-black dark:text-white mb-6">{t("onlineServices")}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <a 
              href="https://india.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border-2 border-orange-500 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-orange-600" />
                  <h4 className="text-lg font-black text-black dark:text-white">National Portal of India</h4>
                </div>
                <ExternalLink className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-sm text-black dark:text-white font-semibold mb-3">One-stop access to government services and information</p>
              <p className="text-sm font-mono text-orange-600 font-bold hover:underline">india.gov.in</p>
            </a>
            
            <a 
              href="https://scholarships.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border-2 border-orange-500 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-orange-600" />
                  <h4 className="text-lg font-black text-black dark:text-white">National Scholarship Portal</h4>
                </div>
                <ExternalLink className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-sm text-black dark:text-white font-semibold mb-3">Apply for scholarships from central and state governments</p>
              <p className="text-sm font-mono text-orange-600 font-bold hover:underline">scholarships.gov.in</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
