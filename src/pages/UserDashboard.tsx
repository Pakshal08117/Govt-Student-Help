import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getSubDistrictTerm } from "@/data/locations";
import { 
  User, FileText, Clock, CheckCircle, XCircle, AlertCircle, 
  Edit, Save, Eye, Download, RefreshCw, Bell, Settings,
  MapPin, Phone, Mail, Calendar, Award, TrendingUp,
  BookOpen, Heart, Briefcase, GraduationCap
} from "lucide-react";

interface Application {
  id: string;
  scheme_id: string;
  status: string;
  district: string;
  taluka: string;
  created_at: string;
  updated_at: string;
  application_data: any;
  documents: Record<string, string>;
}

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  district: string;
  taluka: string;
  phone?: string;
  date_of_birth?: string;
  created_at: string;
}

export default function UserDashboard() {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [applications, setApplications] = useState<Application[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    display_name: "",
    phone: "",
    date_of_birth: ""
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch user profile with better error handling
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // Don't show error for missing profile, we'll create one
        if (profileError.code !== 'PGRST116') {
          toast.error(lang === "hi" ? "प्रोफ़ाइल लोड करने में त्रुटि" : "Error loading profile");
        }
      } else if (profileData) {
        setProfile(profileData);
        setProfileForm({
          display_name: profileData.display_name || "",
          phone: profileData.phone || "",
          date_of_birth: profileData.date_of_birth || ""
        });
      } else {
        // No profile exists, create a basic one
        const newProfile = {
          id: user.id,
          email: user.email!,
          display_name: user.email?.split('@')[0] || "",
          district: "",
          taluka: "",
          created_at: new Date().toISOString()
        };

        const { error: createError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (!createError) {
          setProfile(newProfile);
          setProfileForm({
            display_name: newProfile.display_name,
            phone: "",
            date_of_birth: ""
          });
        }
      }

      // Fetch user applications - Only show current user's applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id) // Ensure only current user's applications
        .order('created_at', { ascending: false });

      if (applicationsError) {
        console.error('Applications fetch error:', applicationsError);
        toast.error(lang === "hi" ? "आवेदन लोड करने में त्रुटि" : "Error loading applications");
      } else {
        setApplications(applicationsData || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error(lang === "hi" ? "डेटा लोड करने में त्रुटि" : "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    try {
      // Validate required fields
      if (!profileForm.display_name.trim()) {
        toast.error(lang === "hi" ? "नाम आवश्यक है" : "Name is required");
        return;
      }

      // Simple profile update approach
      const profileData = {
        display_name: profileForm.display_name.trim(),
        phone: profileForm.phone.trim() || null,
        date_of_birth: profileForm.date_of_birth || null,
        updated_at: new Date().toISOString()
      };

      // Try to update existing profile first
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select();

      if (updateError) {
        // If update fails, try to insert
        const insertData = {
          id: user.id,
          email: user.email!,
          ...profileData,
          district: profile?.district || "",
          taluka: profile?.taluka || "",
          created_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert(insertData);

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }
      }

      toast.success(lang === "hi" ? "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई" : "Profile updated successfully");
      setEditingProfile(false);
      await fetchUserData(); // Refresh data
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(lang === "hi" ? "प्रोफ़ाइल अपडेट करने में त्रुटि। कृपया पुनः प्रयास करें।" : "Error updating profile. Please try again.");
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
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {lang === "hi" ? "डैशबोर्ड लोड हो रहा है..." : "Loading dashboard..."}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved' || app.status === 'completed').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <>
      <Helmet>
        <title>{lang === "hi" ? "उपयोगकर्ता डैशबोर्ड" : "User Dashboard"} | Government & Student Help Platform</title>
        <meta name="description" content="Manage your applications and profile on Government & Student Help Platform" />
      </Helmet>

      {/* Gateway of India Background Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Real Gateway of India Background Image */}
        <div className="absolute inset-0">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop')`,
              filter: 'brightness(0.4) contrast(1.1)',
            }}
          ></div>
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/60 via-yellow-900/40 to-orange-800/70 animate-pulse-slower"></div>
          
          {/* Animated Light Rays */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/20 to-transparent animate-float-slow"></div>
            <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-orange-400/20 to-transparent animate-float-slower"></div>
          </div>
          
          {/* Animated Particles/Dust */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300/30 rounded-full animate-float-slow"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-300/20 rounded-full animate-float-slower"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400/25 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-orange-400/30 rounded-full animate-pulse-slower"></div>
          </div>
          
          {/* Bottom Fade for Content Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80"></div>
        </div>

        {/* Dashboard Content */}
        <section className="relative container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent animate-fade-in">
                  {lang === "hi" ? "मेरा डैशबोर्ड" : "My Dashboard"}
                </h1>
                <p className="font-bold text-black dark:text-white">
                  {lang === "hi" 
                    ? `स्वागत है, ${profile?.display_name || user.email}` 
                    : `Welcome back, ${profile?.display_name || user.email}`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={fetchUserData} className="border-orange-500 font-bold">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {lang === "hi" ? "रिफ्रेश" : "Refresh"}
                </Button>
                <Button variant="outline" size="sm" className="border-orange-500 font-bold">
                <Bell className="h-4 w-4 mr-2" />
                {lang === "hi" ? "सूचनाएं" : "Notifications"}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-2 border-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black text-orange-600">
                {lang === "hi" ? "कुल आवेदन" : "Total Applications"}
              </CardTitle>
              <FileText className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-black dark:text-white">{stats.total}</div>
              <p className="text-xs font-bold text-black dark:text-white mt-1">
                {lang === "hi" ? "सभी समय" : "All time"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 border-2 border-orange-200 dark:border-yellow-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black text-orange-700 dark:text-yellow-400">
                {lang === "hi" ? "लंबित" : "Pending"}
              </CardTitle>
              <Clock className="h-5 w-5 text-orange-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-black dark:text-white">{stats.pending}</div>
              <p className="text-xs font-bold text-black dark:text-white mt-1">
                {lang === "hi" ? "समीक्षा में" : "Under review"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 border-2 border-orange-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black text-orange-700 dark:text-green-400">
                {lang === "hi" ? "अनुमोदित" : "Approved"}
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-orange-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-black dark:text-white">{stats.approved}</div>
              <p className="text-xs font-bold text-black dark:text-white mt-1">
                {lang === "hi" ? "सफल" : "Successful"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black text-orange-600">
                {lang === "hi" ? "सफलता दर" : "Success Rate"}
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-black dark:text-white">
                {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
              </div>
              <p className="text-xs font-bold text-black dark:text-white mt-1">
                {lang === "hi" ? "अनुमोदन दर" : "Approval rate"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-gray-800 dark:to-gray-700">
            <TabsTrigger value="overview" className="flex items-center gap-2 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <User className="h-4 w-4" />
              {lang === "hi" ? "अवलोकन" : "Overview"}
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              {lang === "hi" ? "आवेदन" : "Applications"}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              {lang === "hi" ? "प्रोफ़ाइल" : "Profile"}
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center gap-2 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" />
              {lang === "hi" ? "योजनाएं" : "Schemes"}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{lang === "hi" ? "त्वरित कार्य" : "Quick Actions"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild className="h-20 flex flex-col gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold">
                    <Link to="/schemes">
                      <BookOpen className="h-6 w-6" />
                      <span>{lang === "hi" ? "नई योजना खोजें" : "Find New Schemes"}</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex flex-col gap-2 border-2 border-orange-500 font-bold">
                    <Link to="/tracking">
                      <Eye className="h-6 w-6" />
                      <span>{lang === "hi" ? "आवेदन ट्रैक करें" : "Track Applications"}</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex flex-col gap-2 border-2 border-orange-500 font-bold">
                    <Link to="/document-helper">
                      <FileText className="h-6 w-6" />
                      <span>{lang === "hi" ? "दस्तावेज़ सहायता" : "Document Help"}</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{lang === "hi" ? "हाल के आवेदन" : "Recent Applications"}</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-black text-black dark:text-white mb-2">
                      {lang === "hi" ? "कोई आवेदन नहीं" : "No Applications Yet"}
                    </h3>
                    <p className="font-semibold text-black dark:text-white mb-4">
                      {lang === "hi" 
                        ? "आप अभी तक किसी योजना के लिए आवेदन नहीं किया है।" 
                        : "You haven't applied for any schemes yet."}
                    </p>
                    <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                      <Link to="/schemes">
                        {lang === "hi" ? "योजनाएं देखें" : "Browse Schemes"}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.slice(0, 5).map(app => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all border-2 border-orange-500">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 flex items-center justify-center">
                            {getStatusIcon(app.status)}
                          </div>
                          <div>
                            <p className="font-black text-black dark:text-white">{app.scheme_id}</p>
                            <p className="text-sm font-semibold text-black dark:text-white">
                              {app.district} • {formatDate(app.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(app.status) + " font-bold"}>
                            {getStatusText(app.status)}
                          </Badge>
                          <Button variant="outline" size="sm" asChild className="border-orange-500 font-bold">
                            <Link to={`/tracking?trackingId=${app.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    {applications.length > 5 && (
                      <div className="text-center pt-4">
                        <Button variant="outline" onClick={() => setActiveTab("applications")} className="border-orange-500 font-bold">
                          {lang === "hi" ? "सभी आवेदन देखें" : "View All Applications"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{lang === "hi" ? "मेरे आवेदन" : "My Applications"}</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-black dark:text-white mb-2">
                      {lang === "hi" ? "कोई आवेदन नहीं मिला" : "No Applications Found"}
                    </h3>
                    <p className="font-semibold text-black dark:text-white mb-6">
                      {lang === "hi" 
                        ? "सरकारी योजनाओं के लिए आवेदन करना शुरू करें।" 
                        : "Start applying for government schemes and scholarships."}
                    </p>
                    <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                      <Link to="/schemes">
                        {lang === "hi" ? "योजनाएं खोजें" : "Explore Schemes"}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map(app => (
                      <Card key={app.id} className="hover:shadow-md transition-shadow border-2 border-orange-500 bg-white dark:bg-gray-700">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-black text-black dark:text-white mb-2">{app.scheme_id}</h3>
                              <div className="flex items-center gap-4 text-sm font-semibold text-black dark:text-white">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-orange-600" />
                                  {app.district}, {app.taluka}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-orange-600" />
                                  {formatDate(app.created_at)}
                                </span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(app.status) + " font-bold"}>
                              {getStatusIcon(app.status)}
                              <span className="ml-1">{getStatusText(app.status)}</span>
                            </Badge>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild className="border-orange-500 font-bold">
                              <Link to={`/tracking?trackingId=${app.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                {lang === "hi" ? "विवरण देखें" : "View Details"}
                              </Link>
                            </Button>
                            {app.documents && Object.keys(app.documents).length > 0 && (
                              <Button variant="outline" size="sm" className="border-orange-500 font-bold">
                                <Download className="h-4 w-4 mr-2" />
                                {lang === "hi" ? "दस्तावेज़" : "Documents"}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-black text-black dark:text-white">{lang === "hi" ? "मेरी प्रोफ़ाइल" : "My Profile"}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="border-orange-500 font-bold"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingProfile 
                      ? (lang === "hi" ? "रद्द करें" : "Cancel")
                      : (lang === "hi" ? "संपादित करें" : "Edit")
                    }
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {editingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="display_name" className="font-black text-black dark:text-white">{lang === "hi" ? "पूरा नाम" : "Full Name"}</Label>
                      <Input
                        id="display_name"
                        value={profileForm.display_name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, display_name: e.target.value }))}
                        className="border-orange-500 font-semibold"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-black text-black dark:text-white">{lang === "hi" ? "मोबाइल नंबर" : "Mobile Number"}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="border-orange-500 font-semibold"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date_of_birth" className="font-black text-black dark:text-white">{lang === "hi" ? "जन्म तिथि" : "Date of Birth"}</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={profileForm.date_of_birth}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
                        className="border-orange-500 font-semibold"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={updateProfile} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                        <Save className="h-4 w-4 mr-2" />
                        {lang === "hi" ? "सहेजें" : "Save"}
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProfile(false)} className="border-orange-500 font-bold">
                        {lang === "hi" ? "रद्द करें" : "Cancel"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-black text-black dark:text-white">
                          {lang === "hi" ? "पूरा नाम" : "Full Name"}
                        </Label>
                        <p className="text-lg font-bold text-black dark:text-white">{profile?.display_name || "-"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-black text-black dark:text-white">
                          {lang === "hi" ? "ईमेल" : "Email"}
                        </Label>
                        <p className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                          <Mail className="h-4 w-4 text-orange-600" />
                          {user.email}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-black text-black dark:text-white">
                          {lang === "hi" ? "मोबाइल नंबर" : "Mobile Number"}
                        </Label>
                        <p className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                          <Phone className="h-4 w-4 text-orange-600" />
                          {profile?.phone || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-black text-black dark:text-white">
                          {lang === "hi" ? "जिला" : "District"}
                        </Label>
                        <p className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-600" />
                          {profile?.district || "-"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-black text-black dark:text-white">
                          {lang === "hi" ? "तालुका" : "Taluka"}
                        </Label>
                        <p className="text-lg font-bold text-black dark:text-white">{profile?.taluka || "-"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-black text-black dark:text-white">
                          {lang === "hi" ? "सदस्य बने" : "Member Since"}
                        </Label>
                        <p className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-orange-600" />
                          {profile?.created_at ? formatDate(profile.created_at) : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schemes Tab */}
          <TabsContent value="schemes" className="space-y-6">
            <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="font-black text-black dark:text-white">{lang === "hi" ? "अनुशंसित योजनाएं" : "Recommended Schemes"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 border-2 border-orange-500 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <GraduationCap className="h-8 w-8 text-orange-600" />
                        <div>
                          <h3 className="font-black text-black dark:text-white">{lang === "hi" ? "छात्रवृत्ति" : "Scholarships"}</h3>
                          <p className="text-sm font-bold text-orange-600">{lang === "hi" ? "शिक्षा सहायता" : "Education Support"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full border-orange-500 font-bold">
                        <Link to="/schemes?userType=student">
                          {lang === "hi" ? "देखें" : "Explore"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 border-2 border-orange-200 dark:border-green-800 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="h-8 w-8 text-orange-600 dark:text-green-400" />
                        <div>
                          <h3 className="font-black text-black dark:text-white">{lang === "hi" ? "कल्याण योजनाएं" : "Welfare Schemes"}</h3>
                          <p className="text-sm font-bold text-orange-600 dark:text-green-400">{lang === "hi" ? "सामाजिक सुरक्षा" : "Social Security"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full border-orange-200 dark:border-green-800 font-bold">
                        <Link to="/schemes?userType=citizen">
                          {lang === "hi" ? "देखें" : "Explore"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 border-2 border-orange-500 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="h-8 w-8 text-orange-600" />
                        <div>
                          <h3 className="font-black text-black dark:text-white">{lang === "hi" ? "रोजगार योजनाएं" : "Employment Schemes"}</h3>
                          <p className="text-sm font-bold text-orange-600">{lang === "hi" ? "कौशल विकास" : "Skill Development"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full border-orange-500 font-bold">
                        <Link to="/schemes?category=Employment">
                          {lang === "hi" ? "देखें" : "Explore"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </section>
      </div>
    </>
  );
}