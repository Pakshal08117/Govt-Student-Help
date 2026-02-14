import { useEffect, useMemo, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import { districts, getSubDistrictTerm } from "@/data/locations";
import { Shield, Mail, Lock, User, MapPin } from "lucide-react";
import GatewayBackground from "@/components/GatewayBackground";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Auth() {
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");

  // Admin login state
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/";
  
  // Use ref to persist hasNavigated across renders
  const hasNavigatedRef = useRef(false);
  const hasShownToastRef = useRef(false);

  // Redirect if already authenticated
  useEffect(() => {
    let mounted = true;
    
    // Check initial session without showing welcome message
    const checkInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted && !hasNavigatedRef.current) {
          hasNavigatedRef.current = true;
          navigate(from, { replace: true });
        }
      } catch (error) {
        console.error('Error checking initial session:', error);
      }
    };

    checkInitialSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email);
      
      if (!mounted) return;
      
      // Only handle actual sign-in events, not initial loads or token refresh
      if (session?.user && !hasNavigatedRef.current && event === 'SIGNED_IN') {
        hasNavigatedRef.current = true;
        // Only show toast once
        if (!hasShownToastRef.current) {
          hasShownToastRef.current = true;
          toast.success(t("welcomeBack"));
        }
        navigate(from, { replace: true });
      }
    });
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, from]);

  const canonicalHref = useMemo(() => (typeof window !== "undefined" ? `${window.location.origin}/auth` : "/auth"), []);


  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get admin credentials from environment variables
      const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
      const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

      if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
        toast.error("Admin credentials not configured. Please contact system administrator.");
        setLoading(false);
        return;
      }

      if (adminUsername === ADMIN_USERNAME && adminPassword === ADMIN_PASSWORD) {
        // Store admin session
        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_username", adminUsername);
        
        // Trigger custom event for same-window components
        window.dispatchEvent(new CustomEvent('adminStatusChange'));
        
        toast.success("Admin login successful! Redirecting...");
        
        // Redirect to admin panel
        setTimeout(() => {
          navigate('/admin', { replace: true });
        }, 500);
      } else {
        toast.error(t("invalidCredentials"));
      }
    } catch (err: any) {
      console.error('Admin login error:', err);
      toast.error(t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };
  
  const { signIn, error, clearError } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    
    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        // Don't show toast here - it will be shown by the auth state change listener
        // Just navigate, the welcome message will be handled by the auth state listener
      } else {
        toast.error(result.error || "Please check your credentials and try again.");
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          emailRedirectTo: "https://government-student-help-platform.vercel.app",
          data: {
            display_name: displayName,
            district: district,
            taluka: taluka
          }
        },
      });
      
      if (error) throw error;
      
      // Always try to create or update the profile for the new user
      if (data.user) {
        // Wait a moment for the trigger to potentially run first
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          // Try to upsert the profile (insert or update if exists)
          const { error: profileError } = await supabase.from('profiles')
            .upsert({
              id: data.user.id,
              email: data.user.email!,
              display_name: displayName,
              district: district,
              taluka: taluka
            });
          
          if (profileError) {
            console.error('Profile creation error:', profileError);
          }
        } catch (profileErr) {
          console.error('Profile creation failed:', profileErr);
        }
        
        if (!data.user.email_confirmed_at) {
          toast.success(t("checkEmail"));
        } else {
          // User is already confirmed (email confirmation disabled)
          toast.success(t("accountCreated"));
          // Redirect immediately since no email confirmation is needed
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1500);
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Government & Student Help Platform</title>
        <meta name="description" content="Login or create an account to access government services and schemes." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>

      {/* Gateway of India Background */}
      <GatewayBackground />

      <section className="relative container mx-auto px-4 py-10 md:py-14 z-10">
        <div className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 dark:from-yellow-400 dark:via-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Login to Government & Student Help Platform</h1>
          </div>
          <p className="text-muted-foreground dark:text-gray-400 text-lg">Access services in your preferred language</p>
        </div>
        <div className="max-w-[500px] mx-auto bg-card dark:bg-gray-800 border border-orange-100 dark:border-orange-900 rounded-xl p-8 shadow-lg">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-3 w-full bg-orange-50 dark:bg-gray-700">
              <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">{t("login")}</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">{t("signup")}</TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
                <Shield className="w-3 h-3" />
                {t("admin")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 border-orange-500 focus:border-orange-500" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">{t("password")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 border-orange-500 focus:border-orange-500" required />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 dark:from-yellow-400 dark:to-orange-500 text-white">{loading ? t("pleaseWait") : t("login")}</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-medium">{t("displayName")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={t("enterFullName")} className="pl-10" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-sm font-medium">{t("district")}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Select onValueChange={(value) => {
                        setDistrict(value);
                        setTaluka(""); // Reset taluka when district changes
                      }}>
                        <SelectTrigger className="text-foreground dark:text-white [&>span]:text-foreground dark:[&>span]:text-white pl-10">
                          <SelectValue placeholder={t("selectDistrictPlaceholder")} className="text-foreground dark:text-white" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((d) => (
                            <SelectItem key={d.name} value={d.name} className="text-foreground dark:text-white">
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taluka" className="text-sm font-medium">{t("taluka")}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Select onValueChange={setTaluka} disabled={!district}>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder={t("selectTalukaPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {district && 
                            districts
                              .find((d) => d.name === district)
                              ?.talukas.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email2" className="text-sm font-medium">{t("email")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2" className="text-sm font-medium">{t("password")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="password2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 dark:from-yellow-400 dark:to-orange-500 text-white">{loading ? t("pleaseWait") : t("createAccount")}</Button>
              </form>
            </TabsContent>
            <TabsContent value="admin" className="mt-4">
              <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-500 rounded-lg">
                <div className="flex items-center gap-2 text-orange-900">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-semibold">{t("adminAccessOnly")}</span>
                </div>
                <p className="text-xs text-orange-800 mt-1 font-medium">
                  {t("restrictedArea")}
                </p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="adminUsername" className="text-sm font-medium">{t("adminUsername")}</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="adminUsername" 
                      type="text" 
                      value={adminUsername} 
                      onChange={(e) => setAdminUsername(e.target.value)} 
                      placeholder={t("enterAdminUsername")}
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword" className="text-sm font-medium">{t("adminPassword")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="adminPassword" 
                      type="password" 
                      value={adminPassword} 
                      onChange={(e) => setAdminPassword(e.target.value)} 
                      placeholder={t("enterAdminPassword")}
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  {loading ? t("authenticating") : t("adminLogin")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
