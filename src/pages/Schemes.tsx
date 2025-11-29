import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/contexts/LanguageContext";
import { useRealtime } from "@/contexts/RealtimeContext";
import { schemes as staticSchemes, helplines } from "@/data/schemes";
import { districts } from "@/data/locations";
import { Phone, ExternalLink, Search, MapPin, Wifi, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setupAutoUpdate } from "@/lib/openDataAPIs";
import { supabase } from "@/integrations/supabase/client";

export default function Schemes() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { schemes: realtimeSchemes, isConnected, lastUpdate } = useRealtime();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Combine static and realtime schemes
  const allSchemes = [...staticSchemes, ...realtimeSchemes];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied:", error);
        }
      );
    }

    // Set up auto-update every 30 minutes
    const cleanup = setupAutoUpdate(async () => {
      await refreshData();
    }, 30);

    return cleanup;
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      // Fetch latest schemes from Supabase
      const { data } = await supabase
        .from('schemes')
        .select('*')
        .eq('is_active', true);
      
      console.log('Data refreshed:', data?.length || 0, 'schemes');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredSchemes = allSchemes.filter(scheme => {
    const matchesSearch = 
      scheme[`name_${lang}` as keyof typeof scheme].toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme[`description_${lang}` as keyof typeof scheme].toString().toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    const matchesDistrict = selectedDistrict === "All" || scheme.districts.includes("All") || scheme.districts.includes(selectedDistrict);
    
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  const categories = ["All", "Health", "Education", "Agriculture", "Revenue", "Social Welfare"];

  return (
    <>
      <Helmet>
        <title>{t("schemes")} | MahaHelp Desk</title>
        <meta name="description" content="Browse all Maharashtra government schemes and yojanas" />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("governmentSchemes")}</h1>
            <p className="text-muted-foreground">{t("browseSchemes")}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-600">Live</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Offline</span>
              )}
            </div>
            {lastUpdate && (
              <span className="text-xs text-muted-foreground">
                Updated: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchSchemes")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder={t("category")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="text-black [&>span]:text-black">
              <SelectValue placeholder={t("selectDistrict")} className="text-black" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-black">All Districts</SelectItem>
              {districts.map(d => (
                <SelectItem key={d.name} value={d.name} className="text-black">{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Info */}
        {userLocation && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm">{t("showingNearbySchemes")}</span>
          </div>
        )}

        {/* Helplines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {t("emergencyHelplines")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {helplines.map((helpline, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{helpline[`name_${lang}` as keyof typeof helpline]}</p>
                    <p className="text-sm text-muted-foreground">{helpline[`description_${lang}` as keyof typeof helpline]}</p>
                  </div>
                  <a href={`tel:${helpline.number}`} className="text-primary font-bold text-lg">
                    {helpline.number}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schemes List */}
        <div className="grid gap-6">
          {filteredSchemes.map(scheme => (
            <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {scheme[`name_${lang}` as keyof typeof scheme]}
                    </CardTitle>
                    <Badge variant="secondary">{scheme.category}</Badge>
                  </div>
                  <Button onClick={() => navigate(`/apply?scheme=${scheme.id}`)}>
                    {t("apply")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {scheme[`description_${lang}` as keyof typeof scheme]}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t("eligibility")}</h4>
                    <ul className="text-sm space-y-1">
                      {scheme.eligibility.age && <li>• {scheme.eligibility.age}</li>}
                      {scheme.eligibility.income && <li>• {scheme.eligibility.income}</li>}
                      <li>• {scheme.eligibility.residence}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t("benefits")}</h4>
                    <ul className="text-sm space-y-1">
                      {scheme[`benefits_${lang}` as keyof typeof scheme].slice(0, 3).map((benefit: string, idx: number) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <a href={`tel:${scheme.helpline}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="h-4 w-4" />
                    {scheme.helpline}
                  </a>
                  {scheme.website && (
                    <a href={scheme.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                      <ExternalLink className="h-4 w-4" />
                      {t("visitWebsite")}
                    </a>
                  )}
                </div>

                <div className="mt-4">
                  <Button variant="outline" onClick={() => navigate("/document-helper")} className="w-full">
                    {t("needHelpWithDocuments")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noSchemesFound")}</p>
          </div>
        )}
      </section>
    </>
  );
}
