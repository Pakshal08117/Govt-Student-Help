import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories as cats, states, getDistrictsForState } from "@/data/locations";
import { allServices, searchServices, getServicesByDistrictAndTaluka } from "@/data/services";
import { useLang } from "@/contexts/LanguageContext";
import { Search, MapPin, Building2, Phone, Mail, Clock, ExternalLink, Filter } from "lucide-react";
import { toast } from "sonner";

export default function Services() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get("district") || "");
  const [selectedTaluka, setSelectedTaluka] = useState(searchParams.get("taluka") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  // Get districts for selected state
  const districts = useMemo(() => {
    if (!selectedState) return [];
    return getDistrictsForState(selectedState);
  }, [selectedState]);

  // Get talukas for selected district (simplified - using district name as taluka)
  const talukas = useMemo(() => {
    if (!selectedDistrict) return [];
    return [selectedDistrict]; // Simplified - in real app, fetch actual talukas
  }, [selectedDistrict]);

  // Filter services
  const filteredServices = useMemo(() => {
    let results = allServices;

    // Apply search
    if (searchTerm) {
      results = searchServices(searchTerm, {
        state: selectedState || undefined,
        district: selectedDistrict || undefined,
        taluka: selectedTaluka || undefined,
        category: selectedCategory || undefined
      });
    } else {
      // Apply filters
      if (selectedState) {
        results = results.filter(s => s.state === selectedState || s.state === "All India");
      }
      if (selectedDistrict) {
        results = results.filter(s => s.district === selectedDistrict || s.district === "All Districts");
      }
      if (selectedTaluka) {
        results = results.filter(s => s.taluka === selectedTaluka);
      }
      if (selectedCategory) {
        results = results.filter(s => s.category === selectedCategory);
      }
    }

    return results;
  }, [searchTerm, selectedState, selectedDistrict, selectedTaluka, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedTaluka("");
    setSelectedCategory("");
    setSearchParams(new URLSearchParams());
    toast.success(lang === "hi" ? "फ़िल्टर साफ़ किए गए" : "Filters cleared");
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedState) params.set("state", selectedState);
    if (selectedDistrict) params.set("district", selectedDistrict);
    if (selectedTaluka) params.set("taluka", selectedTaluka);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
    toast.success(lang === "hi" ? "फ़िल्टर लागू किए गए" : "Filters applied");
  };

  const canonicalHref = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Helmet>
        <title>{lang === "hi" ? "सरकारी सेवाएं" : "Government Services"} | Government & Student Help Platform</title>
        <meta name="description" content="Browse local government services by state, district, taluka, and category across India." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-700 via-green-600 to-orange-500 bg-clip-text text-transparent">
              {lang === "hi" ? "सरकारी सेवाएं" : "Government Services"}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === "hi" 
              ? "अपने जिले और तालुका में सरकारी सेवाएं खोजें" 
              : "Find government services in your district and taluka"}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-700">{allServices.length}</div>
              <div className="text-sm text-blue-600">{lang === "hi" ? "सेवाएं" : "Services"}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700">{states.length}</div>
              <div className="text-sm text-green-600">{lang === "hi" ? "राज्य/केंद्र शासित प्रदेश" : "States/UTs"}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-700">700+</div>
              <div className="text-sm text-orange-600">{lang === "hi" ? "जिले" : "Districts"}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-700">24x7</div>
              <div className="text-sm text-purple-600">{lang === "hi" ? "सहायता" : "Support"}</div>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <Card className="mb-8 border-2 border-gray-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              {lang === "hi" ? "उन्नत खोज और फ़िल्टर" : "Advanced Search & Filters"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={lang === "hi" ? "सेवा खोजें (नाम, विवरण)..." : "Search services (name, description)..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* State Filter */}
              <Select value={selectedState} onValueChange={(v) => { 
                setSelectedState(v); 
                setSelectedDistrict(""); 
                setSelectedTaluka(""); 
              }}>
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "राज्य चुनें" : "Select State"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{lang === "hi" ? "सभी राज्य" : "All States"}</SelectItem>
                  {states.map(state => (
                    <SelectItem key={state.name} value={state.name}>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {state.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* District Filter */}
              <Select 
                value={selectedDistrict} 
                onValueChange={(v) => { 
                  setSelectedDistrict(v); 
                  setSelectedTaluka(""); 
                }}
                disabled={!selectedState}
              >
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "जिला चुनें" : "Select District"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{lang === "hi" ? "सभी जिले" : "All Districts"}</SelectItem>
                  {districts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Taluka Filter */}
              <Select 
                value={selectedTaluka} 
                onValueChange={setSelectedTaluka}
                disabled={!selectedDistrict}
              >
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "तालुका चुनें" : "Select Taluka"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{lang === "hi" ? "सभी तालुका" : "All Talukas"}</SelectItem>
                  {talukas.map(taluka => (
                    <SelectItem key={taluka} value={taluka}>{taluka}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "श्रेणी चुनें" : "Select Category"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{lang === "hi" ? "सभी श्रेणियां" : "All Categories"}</SelectItem>
                  {cats.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {lang === "hi" ? cat.hi : lang === "mr" ? cat.mr : cat.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <Button onClick={applyFilters} className="bg-gradient-to-r from-blue-600 to-green-600">
                <Search className="h-4 w-4 mr-2" />
                {lang === "hi" ? "खोजें" : "Search"}
              </Button>
              <Button onClick={clearFilters} variant="outline">
                {lang === "hi" ? "फ़िल्टर साफ़ करें" : "Clear Filters"}
              </Button>
              <Button onClick={() => navigate("/tracking")} variant="secondary">
                {lang === "hi" ? "आवेदन ट्रैक करें" : "Track Application"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {lang === "hi" 
                ? `${filteredServices.length} सेवाएं मिलीं` 
                : `Found ${filteredServices.length} services`}
            </p>
            {(selectedState || selectedDistrict || selectedCategory) && (
              <p className="text-sm text-gray-600 mt-1">
                {selectedState && <Badge variant="secondary" className="mr-2">{selectedState}</Badge>}
                {selectedDistrict && <Badge variant="secondary" className="mr-2">{selectedDistrict}</Badge>}
                {selectedTaluka && <Badge variant="secondary" className="mr-2">{selectedTaluka}</Badge>}
                {selectedCategory && <Badge variant="secondary">{selectedCategory}</Badge>}
              </p>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.length === 0 && (
            <div className="col-span-full">
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {lang === "hi" ? "कोई सेवा नहीं मिली" : "No Services Found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {lang === "hi" 
                    ? "कृपया अपने फ़िल्टर बदलें या अलग खोज शब्द का उपयोग करें।" 
                    : "Please adjust your filters or try different search terms."}
                </p>
                <Button onClick={clearFilters} variant="outline">
                  {lang === "hi" ? "सभी फ़िल्टर साफ़ करें" : "Clear All Filters"}
                </Button>
              </Card>
            </div>
          )}

          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">
                    {lang === "hi" ? service.nameHi : lang === "mr" ? service.nameMr : service.name}
                  </CardTitle>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {service.district}{service.taluka ? `, ${service.taluka}` : ''}, {service.state}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {lang === "hi" ? service.descriptionHi : lang === "mr" ? service.descriptionMr : service.description}
                </p>

                {/* Office Info */}
                <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900">
                        {lang === "hi" ? service.officeHi : lang === "mr" ? service.officeMr : service.office}
                      </p>
                      <p className="text-xs text-blue-700">{service.address}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href={`tel:${service.phone}`} className="text-blue-600 hover:underline">
                      {service.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href={`mailto:${service.email}`} className="text-blue-600 hover:underline text-xs">
                      {service.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {lang === "hi" ? service.workingHoursHi : lang === "mr" ? service.workingHoursMr : service.workingHours}
                    </span>
                  </div>
                </div>

                {/* Fees and Processing Time */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-gray-500">{lang === "hi" ? "शुल्क" : "Fees"}</p>
                    <p className="font-semibold text-gray-900">
                      {lang === "hi" ? service.feesHi : lang === "mr" ? service.feesMr : service.fees}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-gray-500">{lang === "hi" ? "समय" : "Time"}</p>
                    <p className="font-semibold text-gray-900">
                      {lang === "hi" ? service.processingTimeHi : lang === "mr" ? service.processingTimeMr : service.processingTime}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {lang === "hi" ? "दिशा" : "Directions"}
                    </a>
                  </Button>
                  {service.isOnline && service.website && (
                    <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-blue-600 to-green-600">
                      <a href={service.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {lang === "hi" ? "ऑनलाइन आवेदन" : "Apply Online"}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
