import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, districts } from "@/data/locations";
import { useLang } from "@/contexts/LanguageContext";
import { Activity, GraduationCap, Sprout, Landmark, Wrench, Layers } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Health: Activity,
  Education: GraduationCap,
  Agriculture: Sprout,
  Revenue: Landmark,
  "Public Works": Wrench,
  Other: Layers,
};

export default function Index() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [district, setDistrict] = useState<string>("");
  const talukas = useMemo(() => districts.find(d => d.name === district)?.talukas ?? [], [district]);
  const [taluka, setTaluka] = useState<string>("");

  const onSearch = () => {
    const params = new URLSearchParams();
    if (district) params.set("district", district);
    if (taluka) params.set("taluka", taluka);
    navigate(`/services?${params.toString()}`);
  };

  const canonicalHref = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Helmet>
        <title>MahaHelp Desk | Home</title>
        <meta name="description" content="Find local government services in your taluka across Maharashtra." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="bg-gradient-hero animate-bg-pan">
          <div className="container mx-auto px-4">
            <div className="py-16 md:py-24 text-center text-primary-foreground">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-balance">
                {t("heroTitle")}
              </h1>
              <p className="mt-2 text-lg md:text-xl font-medium opacity-95 text-balance">
                {t("tagline")}
              </p>
              <p className="mt-3 md:mt-4 text-base md:text-lg opacity-90 text-balance">
                {t("heroDesc")}
              </p>
              <div className="mt-8 mx-auto max-w-5xl">
                {/* Government Service Search Portal */}
                <div className="relative">
                  {/* Main Search Card with Government Theme */}
                  <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-green-50/30 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] group">
                    
                    {/* Tricolor Border Animation */}
                    <div className="absolute inset-0 rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-white/20 to-green-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-white to-green-500 rounded-t-3xl"></div>
                    </div>
                    
                    {/* Government Seal/Emblem Background */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <svg width="60" height="60" viewBox="0 0 60 60" className="text-gray-600">
                        <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M15 30 L30 15 L45 30 L30 45 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                        <circle cx="30" cy="30" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                    </div>
                    
                    {/* Header Section */}
                    <div className="relative text-center mb-8">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 via-green-600 to-orange-500 bg-clip-text text-transparent">
                          {lang === "en" ? "Government Service Locator" : "सरकारी सेवा शोधक"}
                        </h3>
                      </div>
                      <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        {lang === "en" 
                          ? "Discover government offices, services, and facilities in your area with our comprehensive directory" 
                          : "आमच्या व्यापक निर्देशिकेसह तुमच्या क्षेत्रातील सरकारी कार्यालये, सेवा आणि सुविधा शोधा"}
                      </p>
                    </div>

                    {/* Enhanced Search Form */}
                    <div className="space-y-6">
                      {/* Progress Indicator */}
                      <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                            district ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            <span className="text-sm font-bold">1</span>
                          </div>
                          <div className={`h-1 w-16 transition-colors duration-300 ${
                            district ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                            taluka ? 'bg-green-500 text-white' : district ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            <span className="text-sm font-bold">2</span>
                          </div>
                          <div className={`h-1 w-16 transition-colors duration-300 ${
                            taluka ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                            district && taluka ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-300 text-gray-600'
                          }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Main Search Grid */}
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
                        {/* District Selection */}
                        <div className="md:col-span-5 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                              <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <label className="text-sm font-semibold text-gray-700">
                              {t("selectDistrict")}
                            </label>
                            {district && (
                              <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <Select value={district} onValueChange={(v) => { setDistrict(v); setTaluka(""); }}>
                            <SelectTrigger className="h-14 text-black [&>span]:text-black border-2 border-gray-200 hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-2xl bg-white/80 backdrop-blur shadow-md transition-all duration-300 hover:shadow-lg hover:bg-white group">
                              <div className="flex items-center gap-3 w-full">
                                <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-xl group-hover:bg-orange-600 transition-colors shadow-md">
                                  <svg className="w-5 h-5 text-white" fill="currentColor" stroke="currentColor" strokeWidth={0.5} viewBox="0 0 24 24">
                                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                </div>
                                <SelectValue placeholder={t("selectDistrict")} className="text-black placeholder:text-gray-600 font-medium" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-2 border-gray-100 shadow-xl">
                              {districts.map((d) => (
                                <SelectItem key={d.name} value={d.name} className="text-black hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 focus:bg-orange-100 rounded-xl my-1 transition-all duration-200 font-medium">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    {d.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Taluka Selection */}
                        <div className="md:col-span-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <label className="text-sm font-semibold text-gray-700">
                              {t("selectTaluka")}
                            </label>
                            {taluka && (
                              <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <Select value={taluka} onValueChange={setTaluka}>
                            <SelectTrigger className="h-14 text-black [&>span]:text-black border-2 border-gray-200 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-2xl bg-white/80 backdrop-blur shadow-md transition-all duration-300 hover:shadow-lg hover:bg-white group disabled:opacity-60">
                              <div className="flex items-center gap-3 w-full">
                                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2m2 0h4m4 0h2m-6-4h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2v6zM7 8h2v2H7V8z" />
                                  </svg>
                                </div>
                                <SelectValue 
                  placeholder={district ? t("selectTaluka") : (lang === "en" ? "Select district first" : lang === "mr" ? "प्रथम जिल्हा निवडा" : "पहले जिला चुनें")} 
                                  className="text-black placeholder:text-gray-500 font-medium" 
                                />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-2 border-gray-100 shadow-xl">
                              {talukas.map((tq) => (
                                <SelectItem key={tq} value={tq} className="text-black hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 focus:bg-green-100 rounded-xl my-1 transition-all duration-200 font-medium">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    {tq}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Search Button */}
                        <div className="md:col-span-3">
                          <div className="h-8 flex items-center">
                            <span className="text-sm font-semibold text-gray-700">
                              {lang === "en" ? "Ready to Search" : "शोधण्यासाठी तयार"}
                            </span>
                          </div>
                          <Button 
                            onClick={onSearch} 
                            disabled={!district}
                            className={`w-full h-14 font-bold text-base rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed group ${
                              district && taluka
                                ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-600 hover:via-green-700 hover:to-green-600 text-white shadow-green-200 hover:shadow-xl hover:shadow-green-300'
                                : district 
                                ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 text-white shadow-orange-200 hover:shadow-xl hover:shadow-orange-300'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-3">
                              <div className={`transition-transform duration-300 ${
                                district && taluka ? 'group-hover:rotate-12' : 'group-hover:scale-110'
                              }`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </div>
                              <span>{t("search")}</span>
                              {district && taluka && (
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              )}
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-medium">
                              {lang === "en" ? "Service Active" : "सेवा सक्रिय"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">
                              {lang === "en" ? "24/7 Available" : "२४/७ उपलब्ध"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>
                            {lang === "en" ? `${districts.length} Districts • ${districts.reduce((acc, d) => acc + d.talukas.length, 0)} Talukas` : `${districts.length} जिल्हे • ${districts.reduce((acc, d) => acc + d.talukas.length, 0)} तालुके`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-orange-300/20 to-green-300/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-300/20 to-orange-300/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">{t("categories")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.id];
            return (
              <Card key={cat.id} className="hover:shadow-brand transition-smooth">
                <button
                  onClick={() => navigate(`/services?category=${encodeURIComponent(cat.id)}`)}
                  className="w-full"
                  aria-label={lang === "mr" ? cat.mr : cat.en}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <Icon />
                    </span>
                    <span className="text-sm font-medium">{lang === "mr" ? cat.mr : cat.en}</span>
                  </CardContent>
                </button>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
