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

      <section className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 via-green-600 to-orange-500 bg-clip-text text-transparent">
                {lang === "hi" ? "मेरा डैशबोर्ड" : "My Dashboard"}
              </h1>
              <p className="text-gray-600">
                {lang === "hi" 
                  ? `स्वागत है, ${profile?.display_name || user.email}` 
                  : `Welcome back, ${profile?.display_name || user.email}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={fetchUserData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {lang === "hi" ? "रिफ्रेश" : "Refresh"}
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                {lang === "hi" ? "सूचनाएं" : "Notifications"}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                {lang === "hi" ? "कुल आवेदन" : "Total Applications"}
              </CardTitle>
              <FileText className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.total}</div>
              <p className="text-xs text-blue-600 mt-1">
                {lang === "hi" ? "सभी समय" : "All time"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">
                {lang === "hi" ? "लंबित" : "Pending"}
              </CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-900">{stats.pending}</div>
              <p className="text-xs text-yellow-600 mt-1">
                {lang === "hi" ? "समीक्षा में" : "Under review"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                {lang === "hi" ? "अनुमोदित" : "Approved"}
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{stats.approved}</div>
              <p className="text-xs text-green-600 mt-1">
                {lang === "hi" ? "सफल" : "Successful"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                {lang === "hi" ? "सफलता दर" : "Success Rate"}
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">
                {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
              </div>
              <p className="text-xs text-purple-600 mt-1">
                {lang === "hi" ? "अनुमोदन दर" : "Approval rate"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {lang === "hi" ? "अवलोकन" : "Overview"}
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {lang === "hi" ? "आवेदन" : "Applications"}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {lang === "hi" ? "प्रोफ़ाइल" : "Profile"}
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {lang === "hi" ? "योजनाएं" : "Schemes"}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{lang === "hi" ? "त्वरित कार्य" : "Quick Actions"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild className="h-20 flex flex-col gap-2">
                    <Link to="/schemes">
                      <BookOpen className="h-6 w-6" />
                      <span>{lang === "hi" ? "नई योजना खोजें" : "Find New Schemes"}</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex flex-col gap-2">
                    <Link to="/tracking">
                      <Eye className="h-6 w-6" />
                      <span>{lang === "hi" ? "आवेदन ट्रैक करें" : "Track Applications"}</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex flex-col gap-2">
                    <Link to="/document-helper">
                      <FileText className="h-6 w-6" />
                      <span>{lang === "hi" ? "दस्तावेज़ सहायता" : "Document Help"}</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>{lang === "hi" ? "हाल के आवेदन" : "Recent Applications"}</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      {lang === "hi" ? "कोई आवेदन नहीं" : "No Applications Yet"}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {lang === "hi" 
                        ? "आप अभी तक किसी योजना के लिए आवेदन नहीं किया है।" 
                        : "You haven't applied for any schemes yet."}
                    </p>
                    <Button asChild>
                      <Link to="/schemes">
                        {lang === "hi" ? "योजनाएं देखें" : "Browse Schemes"}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.slice(0, 5).map(app => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            {getStatusIcon(app.status)}
                          </div>
                          <div>
                            <p className="font-medium">{app.scheme_id}</p>
                            <p className="text-sm text-gray-500">
                              {app.district} • {formatDate(app.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(app.status)}>
                            {getStatusText(app.status)}
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/tracking?trackingId=${app.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    {applications.length > 5 && (
                      <div className="text-center pt-4">
                        <Button variant="outline" onClick={() => setActiveTab("applications")}>
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
            <Card>
              <CardHeader>
                <CardTitle>{lang === "hi" ? "मेरे आवेदन" : "My Applications"}</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      {lang === "hi" ? "कोई आवेदन नहीं मिला" : "No Applications Found"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {lang === "hi" 
                        ? "सरकारी योजनाओं के लिए आवेदन करना शुरू करें।" 
                        : "Start applying for government schemes and scholarships."}
                    </p>
                    <Button asChild>
                      <Link to="/schemes">
                        {lang === "hi" ? "योजनाएं खोजें" : "Explore Schemes"}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map(app => (
                      <Card key={app.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">{app.scheme_id}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {app.district}, {app.taluka}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(app.created_at)}
                                </span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(app.status)}>
                              {getStatusIcon(app.status)}
                              <span className="ml-1">{getStatusText(app.status)}</span>
                            </Badge>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/tracking?trackingId=${app.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                {lang === "hi" ? "विवरण देखें" : "View Details"}
                              </Link>
                            </Button>
                            {app.documents && Object.keys(app.documents).length > 0 && (
                              <Button variant="outline" size="sm">
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{lang === "hi" ? "मेरी प्रोफ़ाइल" : "My Profile"}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProfile(!editingProfile)}
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
                      <Label htmlFor="display_name">{lang === "hi" ? "पूरा नाम" : "Full Name"}</Label>
                      <Input
                        id="display_name"
                        value={profileForm.display_name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, display_name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{lang === "hi" ? "मोबाइल नंबर" : "Mobile Number"}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date_of_birth">{lang === "hi" ? "जन्म तिथि" : "Date of Birth"}</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={profileForm.date_of_birth}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={updateProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        {lang === "hi" ? "सहेजें" : "Save"}
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProfile(false)}>
                        {lang === "hi" ? "रद्द करें" : "Cancel"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          {lang === "hi" ? "पूरा नाम" : "Full Name"}
                        </Label>
                        <p className="text-lg">{profile?.display_name || "-"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          {lang === "hi" ? "ईमेल" : "Email"}
                        </Label>
                        <p className="text-lg flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          {lang === "hi" ? "मोबाइल नंबर" : "Mobile Number"}
                        </Label>
                        <p className="text-lg flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {profile?.phone || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          {lang === "hi" ? "जिला" : "District"}
                        </Label>
                        <p className="text-lg flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {profile?.district || "-"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          {lang === "hi" ? "तालुका" : "Taluka"}
                        </Label>
                        <p className="text-lg">{profile?.taluka || "-"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">
                          {lang === "hi" ? "सदस्य बने" : "Member Since"}
                        </Label>
                        <p className="text-lg flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
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
            <Card>
              <CardHeader>
                <CardTitle>{lang === "hi" ? "अनुशंसित योजनाएं" : "Recommended Schemes"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{lang === "hi" ? "छात्रवृत्ति" : "Scholarships"}</h3>
                          <p className="text-sm text-blue-600">{lang === "hi" ? "शिक्षा सहायता" : "Education Support"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link to="/schemes?userType=student">
                          {lang === "hi" ? "देखें" : "Explore"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="font-semibold">{lang === "hi" ? "कल्याण योजनाएं" : "Welfare Schemes"}</h3>
                          <p className="text-sm text-green-600">{lang === "hi" ? "सामाजिक सुरक्षा" : "Social Security"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link to="/schemes?userType=citizen">
                          {lang === "hi" ? "देखें" : "Explore"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="h-8 w-8 text-orange-600" />
                        <div>
                          <h3 className="font-semibold">{lang === "hi" ? "रोजगार योजनाएं" : "Employment Schemes"}</h3>
                          <p className="text-sm text-orange-600">{lang === "hi" ? "कौशल विकास" : "Skill Development"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full">
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
    </>
  );
}