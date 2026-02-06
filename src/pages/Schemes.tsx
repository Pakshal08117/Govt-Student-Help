import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/contexts/LanguageContext";
import { schemes, helplines, getSchemesByFilters, getSchemesByState, searchSchemes, indianStates } from "@/data/schemes";
import { Phone, ExternalLink, Search, Filter, MapPin, GraduationCap, Users, Building2, Heart, Banknote, Home as HomeIcon, Briefcase, Star, TrendingUp, Eye } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Schemes() {
  const { t, lang } = useLang();
  const [searchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All India");
  const [selectedAudience, setSelectedAudience] = useState(searchParams.get("userType") || "All");
  const [selectedType, setSelectedType] = useState("All");

  // Filter schemes based on selections
  const filteredSchemes = (() => {
    let results = schemes;

    // Search filter
    if (searchTerm) {
      results = searchSchemes(searchTerm, selectedState === "All India" ? undefined : selectedState);
    } else {
      // Apply other filters
      results = getSchemesByFilters({
        audience: selectedAudience !== "All" ? selectedAudience as any : undefined,
        type: selectedType !== "All" ? selectedType as any : undefined,
        state: selectedState !== "All India" ? selectedState : undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
      });
    }

    return results;
  })();

  // Get unique categories from schemes
  const uniqueCategories = [...new Set(schemes.map(s => s.category))];

  // Audience options with icons
  const audienceOptions = [
    { value: "All", label: lang === "hi" ? "सभी" : "All", icon: "🌟" },
    { value: "student", label: lang === "hi" ? "छात्र" : "Students", icon: "🎓" },
    { value: "citizen", label: lang === "hi" ? "नागरिक" : "Citizens", icon: "🧑‍💼" },
    { value: "scheme_applicant", label: lang === "hi" ? "योजना आवेदक" : "Scheme Seekers", icon: "📋" },
  ];

  // Scheme type options
  const typeOptions = [
    { value: "All", label: lang === "hi" ? "सभी प्रकार" : "All Types" },
    { value: "government", label: lang === "hi" ? "सरकारी योजना" : "Government Schemes" },
    { value: "scholarship", label: lang === "hi" ? "छात्रवृत्ति" : "Scholarships" },
    { value: "welfare", label: lang === "hi" ? "कल्याण योजना" : "Welfare Schemes" },
    { value: "employment", label: lang === "hi" ? "रोजगार योजना" : "Employment Schemes" },
  ];

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      "Health": "🏥",
      "Education": "🎓", 
      "Agriculture": "🌾",
      "Revenue": "💰",
      "Employment": "💼",
      "Welfare": "🤝",
      "Housing": "🏠"
    };
    return icons[category] || "📋";
  };

  // Get scheme benefits in current language
  const getBenefits = (scheme: Scheme): string[] => {
    const benefits = lang === "hi" && scheme.benefitsHi ? scheme.benefitsHi :
                    lang === "mr" && scheme.benefitsMr ? scheme.benefitsMr :
                    scheme.benefits;
    
    if (Array.isArray(benefits)) {
      return benefits;
    }
    return benefits ? [benefits] : [];
  };

  // Get scheme name in current language
  const getSchemeName = (scheme: Scheme): string => {
    return lang === "hi" && scheme.nameHi ? scheme.nameHi :
           lang === "mr" && scheme.nameMr ? scheme.nameMr :
           scheme.name;
  };

  // Get scheme description in current language
  const getSchemeDescription = (scheme: Scheme): string => {
    return lang === "hi" && scheme.descriptionHi ? scheme.descriptionHi :
           lang === "mr" && scheme.descriptionMr ? scheme.descriptionMr :
           scheme.description;
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedState("All India");
    setSelectedAudience("All");
    setSelectedType("All");
    toast.success(lang === "hi" ? "फ़िल्टर साफ़ किए गए" : "Filters cleared");
  };

  return (
    <>
      <Helmet>
        <title>{lang === "hi" ? "सरकारी योजनाएं" : "Government Schemes"} | Government & Student Help Platform</title>
        <meta name="description" content="Browse comprehensive government schemes and scholarships for all Indian states and union territories" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-700 via-green-600 to-orange-500 bg-clip-text text-transparent">
              {lang === "hi" ? "सरकारी योजनाएं और छात्रवृत्ति" : "Government Schemes & Scholarships"}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === "hi" 
              ? "भारत के सभी राज्यों और केंद्र शासित प्रदेशों के लिए व्यापक सरकारी योजनाएं, छात्रवृत्ति और सेवाएं खोजें"
              : "Discover comprehensive government schemes, scholarships, and services for all Indian states and union territories"}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-700">{schemes.length}</div>
              <div className="text-sm text-blue-600">{lang === "hi" ? "योजनाएं" : lang === "mr" ? "योजना" : "Schemes"}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700">{indianStates.length}</div>
              <div className="text-sm text-green-600">{lang === "hi" ? "राज्य/केंद्र शासित प्रदेश" : lang === "mr" ? "राज्य/केंद्र शासित प्रदेश" : "States/UTs"}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-700">24x7</div>
              <div className="text-sm text-orange-600">{lang === "hi" ? "सहायता" : lang === "mr" ? "सहाय्य" : "Support"}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-700">100%</div>
              <div className="text-sm text-purple-600">{lang === "hi" ? "मुफ्त" : lang === "mr" ? "मोफत" : "Free"}</div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Search */}
              <div className="xl:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={lang === "hi" ? "योजना खोजें (नाम, लाभ, विवरण)..." : "Search schemes (name, benefits, description)..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* User Type Filter */}
              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "आप कौन हैं?" : "Who are you?"} />
                </SelectTrigger>
                <SelectContent>
                  {audienceOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <span className="flex items-center gap-2">
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* State Filter */}
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "राज्य चुनें" : "Select State"} />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map(state => (
                    <SelectItem key={state} value={state}>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{state}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "श्रेणी" : "Category"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{lang === "hi" ? "सभी श्रेणियां" : "All Categories"}</SelectItem>
                  {uniqueCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      <span className="flex items-center gap-2">
                        <span>{getCategoryIcon(cat)}</span>
                        <span>{cat}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Scheme Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder={lang === "hi" ? "योजना प्रकार" : "Scheme Type"} />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <Button
                variant={selectedAudience === "student" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAudience("student")}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                {lang === "hi" ? "छात्र योजनाएं" : "Student Schemes"}
              </Button>
              <Button
                variant={selectedAudience === "citizen" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAudience("citizen")}
              >
                <Users className="h-4 w-4 mr-2" />
                {lang === "hi" ? "नागरिक योजनाएं" : "Citizen Schemes"}
              </Button>
              <Button
                variant={selectedType === "welfare" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("welfare")}
              >
                <Heart className="h-4 w-4 mr-2" />
                {lang === "hi" ? "कल्याण योजनाएं" : "Welfare Schemes"}
              </Button>
              <Button
                variant={selectedType === "scholarship" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("scholarship")}
              >
                <Star className="h-4 w-4 mr-2" />
                {lang === "hi" ? "छात्रवृत्ति" : "Scholarships"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700"
              >
                {lang === "hi" ? "सभी फ़िल्टर साफ़ करें" : "Clear All Filters"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {lang === "hi" 
                ? `${filteredSchemes.length} योजनाएं मिलीं` 
                : `Found ${filteredSchemes.length} schemes`}
            </p>
            <p className="text-sm text-gray-600">
              {selectedState !== "All India" && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {selectedState}
                  {selectedAudience !== "All" && ` • ${audienceOptions.find(a => a.value === selectedAudience)?.label}`}
                </span>
              )}
            </p>
          </div>
          
          {filteredSchemes.length > 0 && (
            <div className="text-sm text-gray-500">
              {lang === "hi" ? "सबसे लोकप्रिय पहले" : "Most popular first"}
            </div>
          )}
        </div>

        {/* Enhanced Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-700 transition-colors">
                    {getSchemeName(scheme)}
                  </CardTitle>
                  <div className="flex flex-col gap-1">
                    <Badge variant="secondary" className="shrink-0">
                      <span className="mr-1">{getCategoryIcon(scheme.category)}</span>
                      {scheme.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {scheme.state}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {getSchemeDescription(scheme)}
                </p>

                {/* Key Benefits */}
                {getBenefits(scheme).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {lang === "hi" ? "मुख्य लाभ:" : "Key Benefits:"}
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {getBenefits(scheme).slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="flex-1">{benefit}</span>
                        </li>
                      ))}
                      {getBenefits(scheme).length > 3 && (
                        <li className="text-blue-600 text-xs font-medium">
                          +{getBenefits(scheme).length - 3} {lang === "hi" ? "और लाभ" : "more benefits"}
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Eligibility Highlights */}
                {((Array.isArray(scheme.eligibility) && scheme.eligibility.length > 0) || 
                  (typeof scheme.eligibility === 'object' && scheme.eligibility)) && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">
                      {lang === "hi" ? "पात्रता:" : "Eligibility:"}
                    </p>
                    <div className="text-xs text-blue-600 space-y-1">
                      {Array.isArray(scheme.eligibility) ? (
                        // Handle array format
                        scheme.eligibility.slice(0, 2).map((criteria, idx) => (
                          <div key={idx} className="flex items-start gap-1">
                            <Users className="h-3 w-3 mt-0.5 shrink-0" />
                            <span>{lang === "hi" ? (scheme.eligibilityHi?.[idx] || criteria) : lang === "mr" ? (scheme.eligibilityMr?.[idx] || criteria) : criteria}</span>
                          </div>
                        ))
                      ) : (
                        // Handle object format
                        <>
                          {scheme.eligibility.age && (
                            <div className="flex items-start gap-1">
                              <Users className="h-3 w-3 mt-0.5 shrink-0" />
                              <span>{lang === "hi" ? "आयु: " : "Age: "}{scheme.eligibility.age}</span>
                            </div>
                          )}
                          {scheme.eligibility.income && (
                            <div className="flex items-start gap-1">
                              <Users className="h-3 w-3 mt-0.5 shrink-0" />
                              <span>{lang === "hi" ? "आय: " : "Income: "}{scheme.eligibility.income}</span>
                            </div>
                          )}
                        </>
                      )}
                      {Array.isArray(scheme.eligibility) && scheme.eligibility.length > 2 && (
                        <div className="text-blue-600 text-xs font-medium">
                          +{scheme.eligibility.length - 2} {lang === "hi" ? "और शर्तें" : "more criteria"}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Target Audience & States */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {scheme.category === "Student" ? "🎓" : "🧑‍💼"} {scheme.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {scheme.state === "All India" ? "🇮🇳 All India" : `📍 ${scheme.state}`}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link to={`/schemes/${scheme.id}`} className="flex items-center justify-center gap-1">
                      <Eye className="h-3 w-3" />
                      {lang === "hi" ? "विवरण देखें" : "View Details"}
                    </Link>
                  </Button>
                  {scheme.helpline && (
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={`tel:${scheme.helpline}`} className="flex items-center justify-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span className="hidden sm:inline">{scheme.helpline}</span>
                        <span className="sm:hidden">{lang === "hi" ? "कॉल" : "Call"}</span>
                      </a>
                    </Button>
                  )}
                  {scheme.website && (
                    <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      <a href={scheme.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        {lang === "hi" ? "आवेदन करें" : "Apply Now"}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {filteredSchemes.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {lang === "hi" ? "कोई योजना नहीं मिली" : "No Schemes Found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === "hi" 
                  ? "कृपया अपने फ़िल्टर बदलें या अलग खोज शब्द का उपयोग करें।" 
                  : "Please adjust your filters or try different search terms."}
              </p>
              <Button onClick={clearFilters} variant="outline">
                {lang === "hi" ? "सभी फ़िल्टर साफ़ करें" : "Clear All Filters"}
              </Button>
            </div>
          </Card>
        )}

        {/* Popular Schemes Section */}
        {filteredSchemes.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                {lang === "hi" ? "सबसे लोकप्रिय योजनाएं" : "Most Popular Schemes"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredSchemes.slice(0, 4).map((scheme) => (
                  <div key={scheme.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getCategoryIcon(scheme.category)}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{getSchemeName(scheme)}</h4>
                        <p className="text-xs text-gray-500">{scheme.category}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {getSchemeDescription(scheme)}
                    </p>
                    <div className="flex gap-1">
                      {scheme.helpline && (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={`tel:${scheme.helpline}`}>
                            <Phone className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {scheme.website && (
                        <Button size="sm" asChild className="flex-1">
                          <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Helplines */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Phone className="h-5 w-5" />
              {lang === "hi" ? "आपातकालीन हेल्पलाइन" : "Emergency Helplines"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {helplines.slice(0, 8).map((helpline, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      {lang === "hi" ? helpline.nameHi : lang === "mr" ? helpline.nameMr : helpline.name}
                    </p>
                    <a href={`tel:${helpline.number}`} className="text-red-600 font-bold hover:text-red-700">
                      {helpline.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer Information */}
        <div className="mt-8 text-center space-y-4">
          <div className="bg-gradient-to-r from-blue-700 via-green-600 to-orange-500 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">
              {lang === "hi" ? "सरकारी सत्यापित जानकारी" : "Government Verified Information"}
            </h3>
            <p className="text-sm opacity-90">
              {lang === "hi" 
                ? "सभी योजनाओं की जानकारी आधिकारिक सरकारी स्रोतों से नियमित रूप से अपडेट की जाती है।" 
                : "All scheme information is regularly updated from official government sources."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
              <a 
                href="https://data.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-blue-200 transition-colors hover:underline cursor-pointer"
              >
                <span>📊 data.gov.in</span>
              </a>
              <a 
                href="https://india.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-blue-200 transition-colors hover:underline cursor-pointer"
              >
                <span>🏛️ india.gov.in</span>
              </a>
              <a 
                href="https://scholarships.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-blue-200 transition-colors hover:underline cursor-pointer"
              >
                <span>🎓 scholarships.gov.in</span>
              </a>
              <a 
                href="tel:1077" 
                className="text-white hover:text-blue-200 transition-colors hover:underline cursor-pointer"
              >
                <span>📞 1077 Helpline</span>
              </a>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            {lang === "hi" 
              ? "यह प्लेटफॉर्म भारत सरकार की डिजिटल इंडिया पहल का हिस्सा है।" 
              : "This platform is part of the Government of India's Digital India initiative."}
          </p>
        </div>
      </div>
    </>
  );
}
