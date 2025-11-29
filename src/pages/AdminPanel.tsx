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
import { useRealtime } from "@/contexts/RealtimeContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileCheck, Users, FileText, TrendingUp, CheckCircle, XCircle, Clock, Wifi, WifiOff, LogOut } from "lucide-react";
import AdminLogin from "@/components/AdminLogin";

interface Application {
  id: string;
  user_id: string;
  scheme_id: string;
  status: string;
  district: string;
  taluka: string;
  created_at: string;
  documents: any;
  user_email: string;
}

export default function AdminPanel() {
  const { t } = useLang();
  const { user } = useAuth();
  const { applications: realtimeApplications, isConnected, lastUpdate } = useRealtime();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = sessionStorage.getItem("admin_authenticated");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && realtimeApplications.length > 0) {
      calculateStats(realtimeApplications);
    }
  }, [realtimeApplications, isAuthenticated]);

  const calculateStats = (apps: Application[]) => {
    const total = apps.length;
    const pending = apps.filter(app => app.status === 'pending').length;
    const approved = apps.filter(app => app.status === 'approved').length;
    const rejected = apps.filter(app => app.status === 'rejected').length;
    
    setStats({ total, pending, approved, rejected });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_username");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', applicationId);

      if (error) throw error;

      toast.success(`Application ${newStatus}`);
      // No need to fetch - realtime will update automatically
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: "secondary", icon: Clock },
      approved: { variant: "default", icon: CheckCircle },
      rejected: { variant: "destructive", icon: XCircle },
      under_review: { variant: "outline", icon: FileCheck }
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

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Helmet>
        <title>{t("adminPanel")} | MahaHelp Desk</title>
        <meta name="description" content="Admin panel for managing applications" />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("adminPanel")}</h1>
            <p className="text-muted-foreground">{t("manageApplications")}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-600">Live</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-red-600">Offline</span>
                </>
              )}
            </div>
            {lastUpdate && (
              <span className="text-xs text-muted-foreground">
                Updated: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("totalApplications")}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("pending")}</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("approved")}</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("rejected")}</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t("recentApplications")}</CardTitle>
          </CardHeader>
          <CardContent>
            {realtimeApplications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t("noApplicationsYet")}
              </div>
            ) : (
              <div className="space-y-4">
                {realtimeApplications.map(app => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{app.user_email}</p>
                        <p className="text-sm text-muted-foreground">
                          {app.district} - {app.taluka}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateApplicationStatus(app.id, 'under_review')}
                        disabled={app.status === 'under_review'}
                      >
                        {t("review")}
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => updateApplicationStatus(app.id, 'approved')}
                        disabled={app.status === 'approved'}
                      >
                        {t("approve")}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateApplicationStatus(app.id, 'rejected')}
                        disabled={app.status === 'rejected'}
                      >
                        {t("reject")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
