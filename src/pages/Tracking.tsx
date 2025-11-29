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
import { 
  findApplicationByTrackingId, 
  findApplicationsByContact,
  getStatusDisplayText,
  getStatusColor,
  type ApplicationTracking 
} from "@/data/applications";
import { toast } from "sonner";
import { CheckCircle, Clock, AlertCircle, XCircle, FileText, Calendar } from "lucide-react";

export default function Tracking() {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [applications, setApplications] = useState<ApplicationTracking[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Check for tracking ID in URL parameters
  useEffect(() => {
    const urlTrackingId = searchParams.get("trackingId");
    if (urlTrackingId) {
      setTrackingId(urlTrackingId);
      // Auto-search for the tracking ID
      const application = findApplicationByTrackingId(urlTrackingId);
      if (application) {
        setApplications([application]);
      } else {
        toast.error(t("noApplicationFound"));
      }
    }
  }, [searchParams]);

  const handleTrackingIdSearch = () => {
    if (!trackingId.trim()) {
      toast.error(t("pleaseEnterTrackingId"));
      return;
    }

    setIsSearching(true);
    const application = findApplicationByTrackingId(trackingId.trim());
    
    if (application) {
      setApplications([application]);
    } else {
      setApplications([]);
      toast.error(t("noApplicationFound"));
    }
    setIsSearching(false);
  };

  const handleContactSearch = () => {
    if (!email.trim() && !phone.trim()) {
      toast.error(t("pleaseEnterContactInfo"));
      return;
    }

    setIsSearching(true);
    const foundApplications = findApplicationsByContact(email.trim(), phone.trim());
    
    if (foundApplications.length > 0) {
      setApplications(foundApplications);
    } else {
      setApplications([]);
      toast.error(t("noApplicationsFound"));
    }
    setIsSearching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="h-4 w-4" />;
      case "under_review":
        return <Clock className="h-4 w-4" />;
      case "documents_required":
        return <AlertCircle className="h-4 w-4" />;
      case "approved":
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>MahaHelp Desk | Track Application</title>
        <meta name="description" content="Track your government service application status in Maharashtra." />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">{t("trackApplication")}</h1>
          <p className="text-muted-foreground mb-8 text-center">{t("tagline")}</p>
          
          <Tabs defaultValue="tracking-id" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tracking-id">{t("trackById")}</TabsTrigger>
              <TabsTrigger value="contact">{t("trackByContact")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracking-id" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("trackById")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tracking-id">{t("trackingId")}</Label>
                    <Input
                      id="tracking-id"
                      placeholder="Enter your tracking ID (e.g., APP2024001)"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleTrackingIdSearch} 
                    disabled={isSearching}
                    className="w-full"
                  >
                    {isSearching ? "Searching..." : t("trackApplication")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("trackByContact")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("emailAddress")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("mobileNumber")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleContactSearch} 
                    disabled={isSearching}
                    className="w-full"
                  >
                    {isSearching ? "Searching..." : t("findApplications")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Application Results */}
          {applications.length > 0 && (
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold">{t("applicationStatus")}</h2>
              
              {applications.map((application) => (
                <Card key={application.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{application.serviceName}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tracking ID: {application.id}
                        </p>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{getStatusDisplayText(application.status)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Application Details */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Application Details</h3>
                        
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Applicant Name</Label>
                            <p>{application.applicantName}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                            <p>{application.applicantEmail}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                            <p>{application.applicantPhone}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Submitted Date</Label>
                            <p>{formatDate(application.submittedDate)}</p>
                          </div>
                          
                          {application.estimatedCompletion && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Estimated Completion</Label>
                              <p>{formatDate(application.estimatedCompletion)}</p>
                            </div>
                          )}
                          
                          {application.remarks && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                              <p className="text-sm">{application.remarks}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Document Status */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Document Status</h3>
                        
                        {application.documents && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>ID Proof</span>
                              <Badge variant={application.documents.idProof ? "default" : "secondary"}>
                                {application.documents.idProof ? "Submitted" : "Pending"}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span>Address Proof</span>
                              <Badge variant={application.documents.addressProof ? "default" : "secondary"}>
                                {application.documents.addressProof ? "Submitted" : "Pending"}
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span>Income Proof</span>
                              <Badge variant={application.documents.incomeProof ? "default" : "secondary"}>
                                {application.documents.incomeProof ? "Submitted" : "Pending"}
                              </Badge>
                            </div>
                            
                            {application.documents.medicalReports !== undefined && (
                              <div className="flex justify-between items-center">
                                <span>Medical Reports</span>
                                <Badge variant={application.documents.medicalReports ? "default" : "secondary"}>
                                  {application.documents.medicalReports ? "Submitted" : "Pending"}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Timeline */}
                    <div className="mt-8">
                      <h3 className="font-semibold text-lg mb-4">Application Timeline</h3>
                      <div className="space-y-4">
                        {application.timeline.map((event, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                {getStatusIcon(event.status)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(event.status)}>
                                  {getStatusDisplayText(event.status)}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(event.date)}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{event.remarks}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
