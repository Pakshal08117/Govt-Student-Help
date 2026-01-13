import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLang } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle, Clock, AlertCircle, XCircle, FileText, Loader2 } from "lucide-react";

interface Application {
  id: string;
  scheme_id: string;
  status: string;
  state: string;
  district: string;
  user_email: string;
  full_name: string;
  mobile_number: string;
  documents: Record<string, string>;
  application_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export default function Tracking() {
  const { t, lang } = useLang();
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Check for tracking ID in URL parameters
  useEffect(() => {
    const urlTrackingId = searchParams.get("trackingId");
    if (urlTrackingId) {
      setTrackingId(urlTrackingId);
      searchByTrackingId(urlTrackingId);
    }
  }, [searchParams]);

  const searchByTrackingId = async (id: string) => {
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast.error(lang === "hi" ? "कोई आवेदन नहीं मिला" : "No application found");
          setApplications([]);
        } else {
          throw error;
        }
      } else if (data) {
        setApplications([data]);
      }
    } catch (error) {
      console.error('Error searching:', error);
      toast.error(lang === "hi" ? "खोज में त्रुटि" : "Error searching");
    } finally {
      setIsSearching(false);
    }
  };

  const handleTrackingIdSearch = () => {
    if (!trackingId.trim()) {
      toast.error(lang === "hi" ? "कृपया ट्रैकिंग आईडी दर्ज करें" : "Please enter tracking ID");
      return;
    }
    searchByTrackingId(trackingId.trim());
  };

  const handleContactSearch = async () => {
    if (!email.trim() && !phone.trim()) {
      toast.error(lang === "hi" ? "कृपया ईमेल या फोन दर्ज करें" : "Please enter email or phone");
      return;
    }

    setIsSearching(true);
    try {
      let query = supabase.from('applications').select('*');
      
      if (email.trim()) {
        query = query.eq('user_email', email.trim());
      }
      if (phone.trim()) {
        query = query.eq('mobile_number', phone.trim());
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data && data.length > 0) {
        setApplications(data);
      } else {
        setApplications([]);
        toast.error(lang === "hi" ? "कोई आवेदन नहीं मिला" : "No applications found");
      }
    } catch (error) {
      console.error('Error searching:', error);
      toast.error(lang === "hi" ? "खोज में त्रुटि" : "Error searching");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "under_review":
        return <Clock className="h-4 w-4" />;
      case "approved":
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "documents_required":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "under_review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "documents_required":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { en: string; hi: string }> = {
      pending: { en: "Pending", hi: "लंबित" },
      under_review: { en: "Under Review", hi: "समीक्षाधीन" },
      approved: { en: "Approved", hi: "स्वीकृत" },
      completed: { en: "Completed", hi: "पूर्ण" },
      rejected: { en: "Rejected", hi: "अस्वीकृत" },
      documents_required: { en: "Documents Required", hi: "दस्तावेज़ आवश्यक" },
    };
    return statusMap[status]?.[lang] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  return (
    <>
      <Helmet>
        <title>{lang === "hi" ? "आवेदन ट्रैक करें" : "Track Application"} | Government & Student Help Platform</title>
        <meta name="description" content="Track your government service application status across India." />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {lang === "hi" ? "आवेदन ट्रैक करें" : "Track Your Application"}
          </h1>
          <p className="text-muted-foreground mb-8 text-center">
            {lang === "hi" 
              ? "अपने आवेदन की स्थिति जानने के लिए ट्रैकिंग आईडी या संपर्क जानकारी दर्ज करें" 
              : "Enter your tracking ID or contact information to check application status"}
          </p>
          
          <Tabs defaultValue="tracking-id" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tracking-id">
                {lang === "hi" ? "ट्रैकिंग आईडी से" : "By Tracking ID"}
              </TabsTrigger>
              <TabsTrigger value="contact">
                {lang === "hi" ? "संपर्क से" : "By Contact"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracking-id" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{lang === "hi" ? "ट्रैकिंग आईडी से खोजें" : "Search by Tracking ID"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tracking-id">{lang === "hi" ? "ट्रैकिंग आईडी" : "Tracking ID"}</Label>
                    <Input
                      id="tracking-id"
                      placeholder={lang === "hi" ? "अपनी ट्रैकिंग आईडी दर्ज करें" : "Enter your tracking ID"}
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTrackingIdSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleTrackingIdSearch} 
                    disabled={isSearching}
                    className="w-full"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {lang === "hi" ? "खोज रहे हैं..." : "Searching..."}
                      </>
                    ) : (
                      lang === "hi" ? "आवेदन खोजें" : "Search Application"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{lang === "hi" ? "संपर्क से खोजें" : "Search by Contact"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{lang === "hi" ? "ईमेल" : "Email Address"}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={lang === "hi" ? "अपना ईमेल दर्ज करें" : "Enter your email address"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{lang === "hi" ? "मोबाइल नंबर" : "Mobile Number"}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={lang === "hi" ? "अपना मोबाइल नंबर दर्ज करें" : "Enter your mobile number"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleContactSearch} 
                    disabled={isSearching}
                    className="w-full"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {lang === "hi" ? "खोज रहे हैं..." : "Searching..."}
                      </>
                    ) : (
                      lang === "hi" ? "आवेदन खोजें" : "Find Applications"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Application Results */}
          {applications.length > 0 && (
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold">
                {lang === "hi" ? "आवेदन की स्थिति" : "Application Status"}
              </h2>
              
              {applications.map((application) => (
                <Card key={application.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          {lang === "hi" ? "आवेदन" : "Application"}: {application.scheme_id}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {lang === "hi" ? "ट्रैकिंग आईडी" : "Tracking ID"}: <span className="font-mono">{application.id}</span>
                        </p>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{getStatusText(application.status)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Application Details */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">
                          {lang === "hi" ? "आवेदन विवरण" : "Application Details"}
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              {lang === "hi" ? "आवेदक का नाम" : "Applicant Name"}
                            </Label>
                            <p>{application.full_name || "-"}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              {lang === "hi" ? "ईमेल" : "Email"}
                            </Label>
                            <p>{application.user_email || "-"}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              {lang === "hi" ? "मोबाइल" : "Mobile"}
                            </Label>
                            <p>{application.mobile_number || "-"}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              {lang === "hi" ? "राज्य / जिला" : "State / District"}
                            </Label>
                            <p>{application.state || "-"} / {application.district || "-"}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              {lang === "hi" ? "जमा करने की तारीख" : "Submitted Date"}
                            </Label>
                            <p>{formatDate(application.created_at)}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              {lang === "hi" ? "अंतिम अपडेट" : "Last Updated"}
                            </Label>
                            <p>{formatDate(application.updated_at)}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Document Status */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">
                          {lang === "hi" ? "दस्तावेज़ स्थिति" : "Document Status"}
                        </h3>
                        
                        {application.documents && Object.keys(application.documents).length > 0 ? (
                          <div className="space-y-2">
                            {Object.entries(application.documents).map(([key, url]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {lang === "hi" ? "जमा" : "Submitted"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">
                            {lang === "hi" ? "कोई दस्तावेज़ अपलोड नहीं किया गया" : "No documents uploaded"}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">
                {lang === "hi" ? "सहायता चाहिए?" : "Need Help?"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {lang === "hi" 
                  ? "यदि आपको अपने आवेदन में कोई समस्या है, तो कृपया हमसे संपर्क करें।" 
                  : "If you have any issues with your application, please contact us."}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <a href="tel:112">📞 112 (Emergency)</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact">{lang === "hi" ? "संपर्क करें" : "Contact Us"}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
