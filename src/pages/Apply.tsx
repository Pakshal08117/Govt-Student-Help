import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLang } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import { schemes } from "@/data/schemes";
import { generateApplicationId } from "@/data/applications";
import { districts, getSubDistrictTerm } from "@/data/locations";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import GatewayBackground from "@/components/GatewayBackground";

export default function Apply() {
  const { t, lang } = useLang();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const serviceId = searchParams.get("service");
  const schemeId = searchParams.get("scheme");
  
  const service = services.find(s => s.id === serviceId);
  const scheme = schemes.find(s => s.id === schemeId);
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    motherName: "",
    aadharNumber: "",
    panNumber: "",
    
    // Contact Information
    mobileNumber: "",
    alternateNumber: "",
    emailAddress: "",
    currentAddress: "",
    permanentAddress: "",
    district: "",
    taluka: "",
    state: "", // Add state to track which state is selected
    
    // Service/Scheme Details
    serviceType: service?.category || scheme?.category || "",
    schemeId: schemeId || "",
    serviceId: serviceId || "",
    medicalIssue: "",
    urgencyLevel: "",
    preferredDate: "",
    preferredTime: "",
    
    // Documents
    documents: {
      idProof: null as File | null,
      addressProof: null as File | null,
      incomeProof: null as File | null,
      medicalReports: null as File | null,
      otherDocuments: null as File | null,
    },
    
    // Declaration
    declaration: false,
    terms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the appropriate sub-district term based on selected state/district
  const subDistrictTerm = formData.state ? getSubDistrictTerm(formData.state) : "Taluka";

  useEffect(() => {
    if (!service && !scheme) {
      navigate("/services");
    }
  }, [service, scheme, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: file }
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.declaration || !formData.terms) {
      toast.error(t("applicationError"));
      return;
    }

    if (!user) {
      toast.error("Please login to submit application");
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload documents to Supabase Storage
      const uploadedDocuments: Record<string, string> = {};
      
      for (const [key, file] of Object.entries(formData.documents)) {
        if (file) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}_${key}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('application-documents')
            .upload(fileName, file);

          if (uploadError) {
            console.error(`Error uploading ${key}:`, uploadError);
            toast.error(`Failed to upload ${key}`);
            continue;
          }

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('application-documents')
            .getPublicUrl(fileName);

          uploadedDocuments[key] = publicUrl;
        }
      }

      // Submit application to Supabase
      const { data, error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          scheme_id: schemeId || serviceId || 'general',
          status: 'pending',
          district: formData.district,
          taluka: formData.taluka,
          user_email: formData.emailAddress,
          full_name: formData.fullName,
          mobile_number: formData.mobileNumber,
          application_data: {
            ...formData,
            documents: undefined // Remove file objects from JSON
          },
          documents: uploadedDocuments
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Generate tracking ID
      const trackingId = data.id;
      
      // Show success with tracking information
      toast.success(`Application submitted successfully! Your tracking ID is: ${trackingId}`);
      
      // Redirect to tracking page
      setTimeout(() => {
        navigate(`/tracking?trackingId=${trackingId}`);
      }, 2000);
      
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(t("applicationError") || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!service && !scheme) {
    return null;
  }

  const currentItem = scheme || service;
  const itemName = scheme ? 
    (lang === 'hi' && scheme.nameHi ? scheme.nameHi : 
     lang === 'mr' && scheme.nameMr ? scheme.nameMr : 
     scheme.name) : 
    (service ? (lang === 'hi' && service.nameHi ? service.nameHi : 
                lang === 'mr' && service.nameMr ? service.nameMr : 
                service.name) : "");
  const isHospitalService = (service?.category === "Health" || scheme?.category === "Health") || 
                          (service?.name?.toLowerCase().includes("hospital") || false);

  return (
    <>
      <Helmet>
        <title>Government & Student Help Platform | {t("applyService")}</title>
        <meta name="description" content="Apply for government services and schemes online." />
      </Helmet>

      {/* Gateway of India Background */}
      <GatewayBackground />

      <section className="relative container mx-auto px-4 py-10 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/services")}
              className="mb-4 border-orange-500 font-bold"
            >
              ← Back to Services
            </Button>
            <h1 className="text-3xl font-black text-black dark:text-white mb-2">{t("applyService")}</h1>
            <p className="font-bold text-black dark:text-white">
              {t("applicationForm")} - {itemName}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{t("personalInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="font-black text-black dark:text-white">{t("fullName")} *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth" className="font-black text-black dark:text-white">{t("dateOfBirth")} *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="gender" className="font-black text-black dark:text-white">{t("gender")} *</Label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="border-orange-500 font-semibold">
                        <SelectValue placeholder={`${t("gender")}...`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t("male")}</SelectItem>
                        <SelectItem value="female">{t("female")}</SelectItem>
                        <SelectItem value="other">{t("other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fatherName" className="font-black text-black dark:text-white">{t("fatherName")} *</Label>
                    <Input
                      id="fatherName"
                      required
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherName" className="font-black text-black dark:text-white">{t("motherName")} *</Label>
                    <Input
                      id="motherName"
                      required
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aadharNumber" className="font-black text-black dark:text-white">{t("aadharNumber")} *</Label>
                    <Input
                      id="aadharNumber"
                      required
                      placeholder="1234 5678 9012"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="panNumber" className="font-black text-black dark:text-white">{t("panNumber")}</Label>
                    <Input
                      id="panNumber"
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange("panNumber", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{t("contactInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mobileNumber" className="font-black text-black dark:text-white">{t("mobileNumber")} *</Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternateNumber" className="font-black text-black dark:text-white">{t("alternateNumber")}</Label>
                    <Input
                      id="alternateNumber"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.alternateNumber}
                      onChange={(e) => handleInputChange("alternateNumber", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailAddress" className="font-black text-black dark:text-white">{t("emailAddress")} *</Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      required
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district" className="font-black text-black dark:text-white">{t("selectDistrict")} *</Label>
                    <Select onValueChange={(value) => {
                      handleInputChange("district", value);
                      handleInputChange("taluka", ""); // Reset taluka when district changes
                    }}>
                      <SelectTrigger className="border-orange-500 font-semibold text-black [&>span]:text-black">
                        <SelectValue placeholder={t("selectDistrict")} className="text-black" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.name} value={district.name} className="text-black">
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="taluka" className="font-black text-black dark:text-white">{subDistrictTerm} *</Label>
                    <Select 
                      onValueChange={(value) => handleInputChange("taluka", value)}
                      disabled={!formData.district}
                    >
                      <SelectTrigger className="border-orange-500 font-semibold">
                        <SelectValue placeholder={`Select ${subDistrictTerm}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.district && 
                          districts
                            .find((d) => d.name === formData.district)
                            ?.talukas.map((taluka) => (
                              <SelectItem key={taluka} value={taluka}>
                                {taluka}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentAddress" className="font-black text-black dark:text-white">{t("currentAddress")} *</Label>
                    <Textarea
                      id="currentAddress"
                      required
                      value={formData.currentAddress}
                      onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="permanentAddress" className="font-black text-black dark:text-white">{t("permanentAddress")} *</Label>
                    <Textarea
                      id="permanentAddress"
                      required
                      value={formData.permanentAddress}
                      onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{t("serviceDetails")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <Label htmlFor="serviceType" className="font-black text-black dark:text-white">{t("serviceType")}</Label>
                  <Input
                    id="serviceType"
                    value={itemName as string}
                    disabled
                    className="bg-orange-100 dark:bg-gray-700 border-orange-500 font-semibold"
                  />
                </div>

                {isHospitalService && (
                  <>
                    <div>
                      <Label htmlFor="medicalIssue" className="font-black text-black dark:text-white">{t("medicalIssue")} *</Label>
                      <Textarea
                        id="medicalIssue"
                        required
                        value={formData.medicalIssue}
                        onChange={(e) => handleInputChange("medicalIssue", e.target.value)}
                        placeholder="Please describe your medical condition or requirement..."
                        className="border-orange-500 font-semibold"
                      />
                    </div>

                    <div>
                      <Label htmlFor="urgencyLevel" className="font-black text-black dark:text-white">{t("urgencyLevel")} *</Label>
                      <Select onValueChange={(value) => handleInputChange("urgencyLevel", value)}>
                        <SelectTrigger className="border-orange-500 font-semibold">
                          <SelectValue placeholder={`${t("urgencyLevel")}...`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t("low")}</SelectItem>
                          <SelectItem value="medium">{t("medium")}</SelectItem>
                          <SelectItem value="high">{t("high")}</SelectItem>
                          <SelectItem value="emergency">{t("emergency")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredDate" className="font-black text-black dark:text-white">{t("preferredDate")}</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredTime" className="font-black text-black dark:text-white">{t("preferredTime")}</Label>
                    <Input
                      id="preferredTime"
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{t("documents")}</CardTitle>
                <p className="text-sm font-semibold text-black dark:text-white">{t("uploadDocuments")}</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="idProof" className="font-black text-black dark:text-white">{t("idProof")} *</Label>
                    <Input
                      id="idProof"
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange("idProof", e.target.files?.[0] || null)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressProof" className="font-black text-black dark:text-white">{t("addressProof")} *</Label>
                    <Input
                      id="addressProof"
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange("addressProof", e.target.files?.[0] || null)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="incomeProof" className="font-black text-black dark:text-white">{t("incomeProof")}</Label>
                    <Input
                      id="incomeProof"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange("incomeProof", e.target.files?.[0] || null)}
                      className="border-orange-500 font-semibold"
                    />
                  </div>
                  {isHospitalService && (
                    <div>
                      <Label htmlFor="medicalReports" className="font-black text-black dark:text-white">{t("medicalReports")}</Label>
                      <Input
                        id="medicalReports"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("medicalReports", e.target.files?.[0] || null)}
                        className="border-orange-500 font-semibold"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="otherDocuments" className="font-black text-black dark:text-white">{t("otherDocuments")}</Label>
                  <Input
                    id="otherDocuments"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("otherDocuments", e.target.files?.[0] || null)}
                    className="border-orange-500 font-semibold"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Declaration */}
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{t("declaration")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="declaration"
                    required
                    checked={formData.declaration}
                    onCheckedChange={(checked) => handleCheckboxChange("declaration", checked as boolean)}
                  />
                  <Label htmlFor="declaration" className="text-sm leading-relaxed font-semibold text-black dark:text-white">
                    {t("declarationText")}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    required
                    checked={formData.terms}
                    onCheckedChange={(checked) => handleCheckboxChange("terms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm font-semibold text-black dark:text-white">
                    {t("terms")}
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold"
              >
                {isSubmitting ? "Submitting..." : t("submitApplication")}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
