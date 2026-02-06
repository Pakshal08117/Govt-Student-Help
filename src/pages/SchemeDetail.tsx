import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { schemes } from "@/data/schemes";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  ExternalLink, 
  Phone, 
  CheckCircle, 
  FileText, 
  Calendar, 
  MapPin, 
  Users, 
  Banknote, 
  Building2,
  Download,
  Share2,
  Bookmark,
  AlertCircle,
  Clock,
  Target,
  Award
} from "lucide-react";

export default function SchemeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();
  const { user } = useAuth();
  const [scheme, setScheme] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundScheme = schemes.find(s => s.id === id);
      if (foundScheme) {
        setScheme(foundScheme);
      } else {
        toast.error(lang === 'hi' ? 'योजना नहीं मिली' : lang === 'mr' ? 'योजना सापडली नाही' : 'Scheme not found');
        navigate('/schemes');
      }
    }
    setLoading(false);
  }, [id, navigate, lang]);

  const handleApply = () => {
    if (!user) {
      toast.error(lang === 'hi' ? 'कृपया पहले लॉगिन करें' : lang === 'mr' ? 'कृपया प्रथम लॉगिन करा' : 'Please login first');
      navigate('/auth');
      return;
    }

    // Check basic eligibility
    if (scheme?.eligibility?.age) {
      // In real app, check user's age
      console.log('Checking age eligibility:', scheme.eligibility.age);
    }

    // Navigate to application form
    navigate(`/apply?scheme=${scheme?.id}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getSchemeName(scheme),
          text: getSchemeDescription(scheme),
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success(lang === 'hi' ? 'लिंक कॉपी किया गया' : lang === 'mr' ? 'लिंक कॉपी केली' : 'Link copied');
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked 
        ? (lang === 'hi' ? 'बुकमार्क हटाया गया' : lang === 'mr' ? 'बुकमार्क काढला' : 'Bookmark removed')
        : (lang === 'hi' ? 'बुकमार्क जोड़ा गया' : lang === 'mr' ? 'बुकमार्क जोडला' : 'Bookmark added')
    );
  };

  const getSchemeName = (scheme: any): string => {
    return scheme?.name_hi && lang === 'hi' ? scheme.name_hi : 
           scheme?.nameHi && lang === 'hi' ? scheme.nameHi :
           scheme?.nameMr && lang === 'mr' ? scheme.nameMr :
           scheme?.name || 'Scheme Name';
  };

  const getSchemeDescription = (scheme: any): string => {
    return scheme?.description_hi && lang === 'hi' ? scheme.description_hi :
           scheme?.descriptionHi && lang === 'hi' ? scheme.descriptionHi :
           scheme?.descriptionMr && lang === 'mr' ? scheme.descriptionMr :
           scheme?.description || 'Scheme Description';
  };

  const getBenefits = (scheme: any): string[] => {
    const benefits = scheme?.benefits_hi && lang === 'hi' ? scheme.benefits_hi :
                    scheme?.benefitsHi && lang === 'hi' ? scheme.benefitsHi :
                    scheme?.benefitsMr && lang === 'mr' ? scheme.benefitsMr :
                    scheme?.benefits_en ? scheme.benefits_en :
                    scheme?.benefits;
    
    if (Array.isArray(benefits)) {
      return benefits;
    }
    return benefits ? [benefits] : [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {lang === 'hi' ? 'योजना लोड हो रही है...' : lang === 'mr' ? 'योजना लोड होत आहे...' : 'Loading scheme...'}
          </p>
        </div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {lang === 'hi' ? 'योजना नहीं मिली' : lang === 'mr' ? 'योजना सापडली नाही' : 'Scheme Not Found'}
            </h2>
            <p className="text-gray-600 mb-4">
              {lang === 'hi' ? 'यह योजना उपलब्ध नहीं है या हटा दी गई है।' : 
               lang === 'mr' ? 'ही योजना उपलब्ध नाही किंवा काढली गेली आहे.' : 
               'This scheme is not available or has been removed.'}
            </p>
            <Button onClick={() => navigate('/schemes')}>
              {lang === 'hi' ? 'सभी योजनाएं देखें' : lang === 'mr' ? 'सर्व योजना पहा' : 'View All Schemes'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getSchemeName(scheme)} | Government & Student Help Platform</title>
        <meta name="description" content={getSchemeDescription(scheme)} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {lang === 'hi' ? 'वापस' : lang === 'mr' ? 'परत' : 'Back'}
          </Button>
          
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleBookmark}
              className={isBookmarked ? 'bg-yellow-50 text-yellow-700' : ''}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scheme Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl md:text-3xl leading-tight mb-3">
                      {getSchemeName(scheme)}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {scheme.category}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {scheme.schemeType}
                      </Badge>
                      {scheme?.state === "All India" && (
                        <Badge className="bg-green-100 text-green-700 text-sm">
                          🇮🇳 All India
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {scheme.ministry && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{scheme.ministry}</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {getSchemeDescription(scheme)}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Accordion type="multiple" defaultValue={["benefits", "eligibility"]} className="space-y-4">
              {/* Benefits */}
              <AccordionItem value="benefits">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-lg font-semibold">
                        {lang === 'hi' ? 'मुख्य लाभ' : lang === 'mr' ? 'मुख्य फायदे' : 'Key Benefits'}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-3">
                      {getBenefits(scheme).map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              {/* Eligibility */}
              <AccordionItem value="eligibility">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-lg font-semibold">
                        {lang === 'hi' ? 'पात्रता मानदंड' : lang === 'mr' ? 'पात्रता निकष' : 'Eligibility Criteria'}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {(typeof scheme?.eligibility === 'object' && scheme.eligibility?.age) && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                          <div>
                            <span className="font-medium">
                              {lang === 'hi' ? 'आयु सीमा: ' : lang === 'mr' ? 'वय मर्यादा: ' : 'Age Limit: '}
                            </span>
                            <span>{scheme.eligibility.age}</span>
                          </div>
                        </div>
                      )}
                      
                      {(typeof scheme?.eligibility === 'object' && scheme.eligibility?.income) && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Banknote className="w-5 h-5 text-blue-600" />
                          <div>
                            <span className="font-medium">
                              {lang === 'hi' ? 'आय सीमा: ' : lang === 'mr' ? 'उत्पन्न मर्यादा: ' : 'Income Limit: '}
                            </span>
                            <span>{scheme.eligibility.income}</span>
                          </div>
                        </div>
                      )}
                      
                      {(typeof scheme?.eligibility === 'object' && scheme.eligibility?.residence) && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <div>
                            <span className="font-medium">
                              {lang === 'hi' ? 'निवास: ' : lang === 'mr' ? 'निवास: ' : 'Residence: '}
                            </span>
                            <span>{scheme.eligibility.residence}</span>
                          </div>
                        </div>
                      )}
                      
                      {(typeof scheme?.eligibility === 'object' && scheme.eligibility?.category) && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                          <div>
                            <span className="font-medium">
                              {lang === 'hi' ? 'श्रेणी: ' : lang === 'mr' ? 'श्रेणी: ' : 'Category: '}
                            </span>
                            <span>{scheme.eligibility.category}</span>
                          </div>
                        </div>
                      )}

                      {/* Handle array format eligibility for backward compatibility */}
                      {Array.isArray(scheme?.eligibility) && scheme.eligibility.map((criteria: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                          <span className="text-gray-700">
                            {lang === 'hi' && scheme.eligibilityHi?.[index] ? scheme.eligibilityHi[index] :
                             lang === 'mr' && scheme.eligibilityMr?.[index] ? scheme.eligibilityMr[index] :
                             criteria}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              {/* Required Documents */}
              <AccordionItem value="documents">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-lg font-semibold">
                        {lang === 'hi' ? 'आवश्यक दस्तावेज़' : lang === 'mr' ? 'आवश्यक कागदपत्रे' : 'Required Documents'}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-2">
                      {/* Handle documents from eligibility object */}
                      {(typeof scheme?.eligibility === 'object' && scheme.eligibility?.documents) && 
                        scheme.eligibility.documents.map((doc: string, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span>{doc}</span>
                          </div>
                        ))
                      }
                      
                      {/* Handle documents from separate documents array */}
                      {scheme?.documents && scheme.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span>
                            {lang === 'hi' && scheme.documentsHi?.[index] ? scheme.documentsHi[index] :
                             lang === 'mr' && scheme.documentsMr?.[index] ? scheme.documentsMr[index] :
                             doc}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        💡 {lang === 'hi' ? 'सुझाव: आवेदन करने से पहले सभी दस्तावेज़ तैयार रखें।' : 
                             lang === 'mr' ? 'सूचना: अर्ज करण्यापूर्वी सर्व कागदपत्रे तयार ठेवा.' : 
                             'Tip: Keep all documents ready before applying.'}
                      </p>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              {/* How to Apply */}
              <AccordionItem value="apply">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-lg font-semibold">
                        {lang === 'hi' ? 'आवेदन कैसे करें' : lang === 'mr' ? 'अर्ज कसा करावा' : 'How to Apply'}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      {scheme?.howToApply && scheme.howToApply.map((step: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                      
                      {/* Fallback to applicationProcess if howToApply is not available */}
                      {!scheme?.howToApply && scheme?.applicationProcess && scheme.applicationProcess.map((step: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">
                            {lang === 'hi' && scheme.applicationProcessHi?.[index] ? scheme.applicationProcessHi[index] :
                             lang === 'mr' && scheme.applicationProcessMr?.[index] ? scheme.applicationProcessMr[index] :
                             step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button - Sticky */}
            <Card className="sticky top-4">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleApply}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-6"
                >
                  {lang === 'hi' ? 'अभी आवेदन करें' : lang === 'mr' ? 'आत्ता अर्ज करा' : 'Apply Now'}
                </Button>
                
                <div className="mt-4 space-y-3">
                  {scheme.helpline && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={`tel:${scheme.helpline}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        {lang === 'hi' ? 'हेल्पलाइन: ' : lang === 'mr' ? 'हेल्पलाइन: ' : 'Helpline: '}{scheme.helpline}
                      </a>
                    </Button>
                  )}
                  
                  {scheme.website && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {lang === 'hi' ? 'आधिकारिक वेबसाइट' : lang === 'mr' ? 'अधिकृत वेबसाइट' : 'Official Website'}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {lang === 'hi' ? 'त्वरित जानकारी' : lang === 'mr' ? 'द्रुत माहिती' : 'Quick Info'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {lang === 'hi' ? 'श्रेणी' : lang === 'mr' ? 'श्रेणी' : 'Category'}
                  </span>
                  <Badge variant="secondary">{scheme.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {lang === 'hi' ? 'प्रकार' : lang === 'mr' ? 'प्रकार' : 'Type'}
                  </span>
                  <Badge variant="outline">{scheme.schemeType}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {lang === 'hi' ? 'क्षेत्र' : lang === 'mr' ? 'क्षेत्र' : 'Coverage'}
                  </span>
                  <span className="text-sm">
                    {scheme?.state === "All India" ? 
                      (lang === 'hi' ? 'अखिल भारत' : lang === 'mr' ? 'अखिल भारत' : 'All India') : 
                      scheme?.state || 'State specific'
                    }
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {lang === 'hi' ? 'लक्षित समूह' : lang === 'mr' ? 'लक्षित गट' : 'Target Group'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {scheme?.targetAudience && scheme.targetAudience.map((audience: string) => (
                      <Badge key={audience} variant="outline" className="text-xs">
                        {audience}
                      </Badge>
                    ))}
                    {/* Fallback if no targetAudience */}
                    {!scheme?.targetAudience && (
                      <Badge variant="outline" className="text-xs">
                        {scheme?.category || 'General'}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-blue-900 mb-3">
                  {lang === 'hi' ? 'मदद चाहिए?' : lang === 'mr' ? 'मदत हवी?' : 'Need Help?'}
                </h3>
                <p className="text-blue-800 text-sm mb-4">
                  {lang === 'hi' ? 'हमारे AI असिस्टेंट से बात करें या हेल्पलाइन पर कॉल करें।' : 
                   lang === 'mr' ? 'आमच्या AI सहाय्यकाशी बोला किंवा हेल्पलाइनवर कॉल करा.' : 
                   'Chat with our AI assistant or call the helpline.'}
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-blue-700 border-blue-300">
                    <Phone className="w-4 h-4 mr-2" />
                    1077 (24x7)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}