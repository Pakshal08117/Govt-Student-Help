import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { schemes, indianStates, getSchemesByFilters } from "@/data/schemes";
import { toast } from "sonner";
import { 
  FileCheck, Users, FileText, TrendingUp, CheckCircle, XCircle, Clock, 
  Wifi, WifiOff, LogOut, Plus, Edit, Trash2, Search, Filter, 
  BarChart3, PieChart, Activity, Database, Settings, Shield,
  Download, Upload, RefreshCw, Eye, MapPin, Building2, AlertTriangle
} from "lucide-react";
import AdminLogin from "@/components/AdminLogin";
import { useNavigate } from "react-router-dom";

interface Application {
  id: string;
  user_id: string;
  scheme_id: string;
  status: string;
  district: string;
  taluka: string;
  created_at: string;
  updated_at: string;
  application_data: any;
  documents: Record<string, string>;
  user_email: string;
}

interface SchemeStats {
  totalSchemes: number;
  centralSchemes: number;
  stateSchemes: number;
  activeSchemes: number;
  categories: Record<string, number>;
  states: Record<string, number>;
}

export default function AdminPanel() {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");

  // Check admin access - Use session-based authentication
  useEffect(() => {
    const checkAuth = () => {
      const isAdminAuthenticated = sessionStorage.getItem("admin_authenticated") === "true";
      const adminUsername = sessionStorage.getItem("admin_username");
      const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
      
      if (isAdminAuthenticated && adminUsername === ADMIN_USERNAME) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
    
    // Check authentication status periodically (but don't show toast)
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Show welcome toast only once when authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      const hasShownWelcome = sessionStorage.getItem("admin_welcome_shown");
      if (!hasShownWelcome) {
        toast.success(lang === "hi" ? "प्रशासक पैनल में स्वागत" : "Welcome to Admin Panel");
        sessionStorage.setItem("admin_welcome_shown", "true");
      }
    }
  }, [isAuthenticated, loading, lang]);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Don't redirect, just show login form
    }
  }, [loading, isAuthenticated]);

  // Real applications data from Supabase
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [realTimeStats, setRealTimeStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    todayApplications: 0,
    pendingApplications: 0
  });

  // Fetch real data from Supabase
  const fetchAdminData = async () => {
    try {
      // Fetch all users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Users fetch error:', usersError);
      } else {
        setUsers(usersData || []);
      }

      // Fetch real applications from Supabase
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select(`
          *,
          profiles!applications_user_id_fkey(email)
        `)
        .order('created_at', { ascending: false });

      if (applicationsError) {
        console.error('Applications fetch error:', applicationsError);
        toast.error(lang === "hi" ? "आवेदन लोड करने में त्रुटि" : "Error loading applications");
      } else {
        // Transform data to match Application interface
        const transformedApps: Application[] = (applicationsData || []).map(app => ({
          id: app.id,
          user_id: app.user_id,
          scheme_id: app.scheme_id,
          status: app.status,
          district: app.district || '',
          taluka: app.taluka || '',
          created_at: app.created_at,
          updated_at: app.updated_at,
          application_data: app.application_data || {},
          documents: app.documents || {},
          user_email: (app.profiles as any)?.email || 'N/A'
        }));
        
        setApplications(transformedApps);
      }

      // Calculate real-time stats
      const totalUsers = usersData?.length || 0;
      const totalApplications = applicationsData?.length || 0;
      const today = new Date().toISOString().split('T')[0];
      const todayApplications = (applicationsData || []).filter(app => 
        app.created_at.startsWith(today)
      ).length;
      const pendingApplications = (applicationsData || []).filter(app => 
        app.status === 'pending'
      ).length;

      setRealTimeStats({
        totalUsers,
        totalApplications,
        todayApplications,
        pendingApplications
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error(lang === "hi" ? "डेटा लोड करने में त्रुटि" : "Error loading admin data");
    }
  };

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const [schemeStats, setSchemeStats] = useState<SchemeStats>({
    totalSchemes: 0,
    centralSchemes: 0,
    stateSchemes: 0,
    activeSchemes: 0,
    categories: {},
    states: {}
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
      calculateSchemeStats();
      
      // Set up real-time updates
      const interval = setInterval(fetchAdminData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const calculateStats = (apps: Application[]) => {
    const total = apps.length;
    const pending = apps.filter(app => app.status === 'pending').length;
    const approved = apps.filter(app => app.status === 'approved' || app.status === 'completed').length;
    const rejected = apps.filter(app => app.status === 'rejected').length;
    
    setStats({ total, pending, approved, rejected });
  };

  // Update stats when applications change
  useEffect(() => {
    calculateStats(applications);
  }, [applications]);

  const calculateSchemeStats = () => {
    const totalSchemes = schemes.length;
    const centralSchemes = schemes.filter(s => s.states.includes("All India")).length;
    const stateSchemes = totalSchemes - centralSchemes;
    const activeSchemes = totalSchemes; // All schemes are active in our data

    // Category distribution
    const categories: Record<string, number> = {};
    schemes.forEach(scheme => {
      categories[scheme.category] = (categories[scheme.category] || 0) + 1;
    });

    // State distribution
    const states: Record<string, number> = {};
    schemes.forEach(scheme => {
      scheme.states.forEach(state => {
        if (state !== "All India") {
          states[state] = (states[state] || 0) + 1;
        }
      });
    });

    setSchemeStats({
      totalSchemes,
      centralSchemes,
      stateSchemes,
      activeSchemes,
      categories,
      states
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_username");
    sessionStorage.removeItem("admin_welcome_shown");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) {
        throw error;
      }

      toast.success(`Application ${newStatus} successfully`);
      await fetchAdminData(); // Refresh data
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application');
    }
  };

  const deleteApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

      if (error) {
        throw error;
      }

      toast.success('Application deleted successfully');
      await fetchAdminData(); // Refresh data
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This will also delete all their applications.')) return;

    try {
      // Delete the user profile from Supabase
      const { error: userError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (userError) throw userError;

      toast.success('User deleted successfully');
      await fetchAdminData(); // Refresh data
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: "secondary", icon: Clock, color: "text-yellow-600" },
      approved: { variant: "default", icon: CheckCircle, color: "text-green-600" },
      rejected: { variant: "destructive", icon: XCircle, color: "text-red-600" },
      under_review: { variant: "outline", icon: FileCheck, color: "text-blue-600" }
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  // Filter schemes based on search and filters
  const filteredSchemes = schemes.filter(scheme => {
    const searchMatch = searchTerm === "" || 
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (scheme.nameHi && scheme.nameHi.includes(searchTerm)) ||
      (scheme.nameMr && scheme.nameMr.includes(searchTerm)) ||
      scheme.category.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch = selectedCategory === "All" || scheme.category === selectedCategory;
    const stateMatch = selectedState === "All" || 
      scheme.states.includes("All India") || 
      scheme.states.includes(selectedState);

    return searchMatch && categoryMatch && stateMatch;
  });

  const uniqueCategories = [...new Set(schemes.map(s => s.category))];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Helmet>
        <title>{lang === "hi" ? "प्रशासक पैनल" : "Admin Panel"} | Government & Student Help Platform</title>
        <meta name="description" content="Comprehensive admin panel for managing schemes and applications" />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-700 via-green-600 to-orange-500 bg-clip-text text-transparent">
              {lang === "hi" ? "प्रशासक पैनल" : "Admin Dashboard"}
            </h1>
            <p className="text-gray-600">
              {lang === "hi" 
                ? "योजनाओं और आवेदनों का व्यापक प्रबंधन" 
                : "Comprehensive management of schemes and applications"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700">
              <Wifi className="h-4 w-4" />
              <span className="text-sm font-medium">Live</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {lang === "hi" ? "लॉगआउट" : "Logout"}
            </Button>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {lang === "hi" ? "डैशबोर्ड" : "Dashboard"}
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              {lang === "hi" ? "योजनाएं" : "Schemes"}
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {lang === "hi" ? "आवेदन" : "Applications"}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              {lang === "hi" ? "विश्लेषण" : "Analytics"}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {lang === "hi" ? "सेटिंग्स" : "Settings"}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Enhanced Overview Stats with Real Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700">
                    {lang === "hi" ? "कुल उपयोगकर्ता" : "Total Users"}
                  </CardTitle>
                  <Users className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">{realTimeStats.totalUsers}</div>
                  <p className="text-xs text-blue-600 mt-1">
                    {lang === "hi" ? "पंजीकृत उपयोगकर्ता" : "Registered users"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">
                    {lang === "hi" ? "कुल आवेदन" : "Total Applications"}
                  </CardTitle>
                  <FileText className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">{realTimeStats.totalApplications}</div>
                  <p className="text-xs text-green-600 mt-1">
                    {lang === "hi" ? "सभी समय" : "All time"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700">
                    {lang === "hi" ? "आज के आवेदन" : "Today's Applications"}
                  </CardTitle>
                  <Activity className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-900">{realTimeStats.todayApplications}</div>
                  <p className="text-xs text-orange-600 mt-1">
                    {lang === "hi" ? "आज प्राप्त" : "Received today"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-red-700">
                    {lang === "hi" ? "लंबित आवेदन" : "Pending Applications"}
                  </CardTitle>
                  <Clock className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-900">{realTimeStats.pendingApplications}</div>
                  <p className="text-xs text-red-600 mt-1">
                    {lang === "hi" ? "तत्काल ध्यान दें" : "Needs attention"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {lang === "hi" ? "त्वरित कार्य" : "Quick Actions"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("applications")}>
                    <FileCheck className="h-6 w-6" />
                    <span>{lang === "hi" ? "आवेदन समीक्षा" : "Review Applications"}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("schemes")}>
                    <Plus className="h-6 w-6" />
                    <span>{lang === "hi" ? "नई योजना जोड़ें" : "Add New Scheme"}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("analytics")}>
                    <BarChart3 className="h-6 w-6" />
                    <span>{lang === "hi" ? "रिपोर्ट देखें" : "View Reports"}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{lang === "hi" ? "हाल की गतिविधि" : "Recent Activity"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{app.user_email}</p>
                          <p className="text-xs text-gray-500">{app.district} • {new Date(app.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schemes Management Tab */}
          <TabsContent value="schemes" className="space-y-6">
            {/* Schemes Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{lang === "hi" ? "योजना प्रबंधन" : "Scheme Management"}</h2>
                <p className="text-gray-600">{lang === "hi" ? "सभी सरकारी योजनाओं को प्रबंधित करें" : "Manage all government schemes"}</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                <Plus className="h-4 w-4 mr-2" />
                {lang === "hi" ? "नई योजना जोड़ें" : "Add New Scheme"}
              </Button>
            </div>

            {/* Schemes Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={lang === "hi" ? "योजना खोजें..." : "Search schemes..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={lang === "hi" ? "श्रेणी" : "Category"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">{lang === "hi" ? "सभी श्रेणियां" : "All Categories"}</SelectItem>
                      {uniqueCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder={lang === "hi" ? "राज्य" : "State"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">{lang === "hi" ? "सभी राज्य" : "All States"}</SelectItem>
                      {indianStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      {lang === "hi" ? "निर्यात" : "Export"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      {lang === "hi" ? "आयात" : "Import"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schemes List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {lang === "hi" && scheme.nameHi ? scheme.nameHi : 
                             lang === "mr" && scheme.nameMr ? scheme.nameMr : 
                             scheme.name}
                          </h3>
                          <Badge variant="secondary">{scheme.category}</Badge>
                          <Badge variant="outline">{scheme.schemeType}</Badge>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {lang === "hi" && scheme.descriptionHi ? scheme.descriptionHi : 
                           lang === "mr" && scheme.descriptionMr ? scheme.descriptionMr : 
                           scheme.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {scheme.states.includes("All India") ? "All India" : `${scheme.states.length} states`}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {scheme.ministry || "Government of India"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {scheme.targetAudience.join(", ")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2">
                  {lang === "hi" ? "कोई योजना नहीं मिली" : "No Schemes Found"}
                </h3>
                <p className="text-gray-600">
                  {lang === "hi" ? "फ़िल्टर बदलें या नई योजना जोड़ें" : "Adjust filters or add a new scheme"}
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Enhanced Applications Management Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{lang === "hi" ? "आवेदन प्रबंधन" : "Application Management"}</h2>
                <p className="text-gray-600">{lang === "hi" ? "सभी उपयोगकर्ता आवेदनों को प्रबंधित करें" : "Manage all user applications"}</p>
              </div>
              <Button onClick={fetchAdminData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                {lang === "hi" ? "रिफ्रेश" : "Refresh"}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{lang === "hi" ? "सभी आवेदन" : "All Applications"}</span>
                  <Badge variant="secondary">{applications.length} {lang === "hi" ? "कुल" : "Total"}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p>{lang === "hi" ? "कोई आवेदन नहीं मिला" : "No applications found"}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map(app => (
                      <Card key={app.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold">{app.scheme_id}</h3>
                                {getStatusBadge(app.status)}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {app.user_email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {app.district}, {app.taluka}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(app.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-3 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(app.id, 'under_review')}
                              disabled={app.status === 'under_review'}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              {lang === "hi" ? "समीक्षा" : "Review"}
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => updateApplicationStatus(app.id, 'approved')}
                              disabled={app.status === 'approved'}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {lang === "hi" ? "अनुमोदन" : "Approve"}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateApplicationStatus(app.id, 'rejected')}
                              disabled={app.status === 'rejected'}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              {lang === "hi" ? "अस्वीकार" : "Reject"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(app.id, 'documents_required')}
                              disabled={app.status === 'documents_required'}
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              {lang === "hi" ? "दस्तावेज़ चाहिए" : "Need Docs"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteApplication(app.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              {lang === "hi" ? "हटाएं" : "Delete"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Management Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{lang === "hi" ? "उपयोगकर्ता प्रबंधन" : "User Management"}</span>
                  <Badge variant="secondary">{users.length} {lang === "hi" ? "उपयोगकर्ता" : "Users"}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 10).map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.display_name || user.email}</p>
                          <p className="text-sm text-gray-500">
                            {user.email} • {user.district || 'No district'} • 
                            {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {users.length > 10 && (
                    <p className="text-center text-gray-500 text-sm">
                      {lang === "hi" ? `और ${users.length - 10} उपयोगकर्ता...` : `And ${users.length - 10} more users...`}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{lang === "hi" ? "श्रेणी वितरण" : "Category Distribution"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(schemeStats.categories).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(count / schemeStats.totalSchemes) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Application Status */}
              <Card>
                <CardHeader>
                  <CardTitle>{lang === "hi" ? "आवेदन स्थिति" : "Application Status"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        {lang === "hi" ? "लंबित" : "Pending"}
                      </span>
                      <span className="font-medium">{stats.pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {lang === "hi" ? "अनुमोदित" : "Approved"}
                      </span>
                      <span className="font-medium">{stats.approved}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        {lang === "hi" ? "अस्वीकृत" : "Rejected"}
                      </span>
                      <span className="font-medium">{stats.rejected}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {lang === "hi" ? "सिस्टम सेटिंग्स" : "System Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {lang === "hi" ? "प्लेटफॉर्म कॉन्फ़िगरेशन" : "Platform Configuration"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{lang === "hi" ? "डिफ़ॉल्ट भाषा" : "Default Language"}</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="mr">मराठी</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{lang === "hi" ? "अधिकतम अपलोड आकार" : "Max Upload Size"}</Label>
                      <Select defaultValue="10mb">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5mb">5 MB</SelectItem>
                          <SelectItem value="10mb">10 MB</SelectItem>
                          <SelectItem value="20mb">20 MB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {lang === "hi" ? "सुरक्षा सेटिंग्स" : "Security Settings"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{lang === "hi" ? "दो-कारक प्रमाणीकरण" : "Two-Factor Authentication"}</p>
                        <p className="text-sm text-gray-500">{lang === "hi" ? "अतिरिक्त सुरक्षा के लिए सक्षम करें" : "Enable for additional security"}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {lang === "hi" ? "सक्षम करें" : "Enable"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{lang === "hi" ? "सत्र समय सीमा" : "Session Timeout"}</p>
                        <p className="text-sm text-gray-500">{lang === "hi" ? "निष्क्रियता के बाद स्वचालित लॉगआउट" : "Auto logout after inactivity"}</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                    {lang === "hi" ? "सेटिंग्स सहेजें" : "Save Settings"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
