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
import { districts } from "@/data/locations";
import { Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Auth() {
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
          toast.success("Welcome back!");
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
      // Admin credentials - India/1234
      const ADMIN_USERNAME = "India";
      const ADMIN_PASSWORD = "1234";

      if (adminUsername === ADMIN_USERNAME && adminPassword === ADMIN_PASSWORD) {
        // Store admin session
        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_username", adminUsername);
        
        // Trigger custom event for same-window components
        window.dispatchEvent(new CustomEvent('adminStatusChange'));
        
        toast.success("Admin login successful! Welcome to Admin Panel");
        navigate('/admin', { replace: true });
      } else {
        toast.error("Invalid credentials. Please check your admin credentials and try again.");
      }
    } catch (err: any) {
      console.error('Admin login error:', err);
      toast.error("Login failed. An unexpected error occurred. Please try again.");
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
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          emailRedirectTo: redirectUrl,
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
          toast.success("Check your email - We sent you a confirmation link to complete your registration.");
        } else {
          // User is already confirmed (email confirmation disabled)
          toast.success("Account created! Welcome to Government & Student Help Platform!");
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
      <section className="container mx-auto px-4 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Login to Government & Student Help Platform</h1>
        <div className="max-w-md mx-auto bg-card border rounded-lg p-6 shadow-sm">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading} className="w-full">{loading ? "Please wait..." : "Login"}</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter your full name" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select onValueChange={(value) => {
                      setDistrict(value);
                      setTaluka(""); // Reset taluka when district changes
                    }}>
                      <SelectTrigger className="text-foreground dark:text-white [&>span]:text-foreground dark:[&>span]:text-white">
                        <SelectValue placeholder="Select District" className="text-foreground dark:text-white" />
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
                  <div className="space-y-2">
                    <Label htmlFor="taluka">Taluka</Label>
                    <Select onValueChange={setTaluka} disabled={!district}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Taluka" />
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
                <div className="space-y-2">
                  <Label htmlFor="email2">Email</Label>
                  <Input id="email2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2">Password</Label>
                  <Input id="password2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading} className="w-full">{loading ? "Please wait..." : "Create account"}</Button>
              </form>
            </TabsContent>
            <TabsContent value="admin" className="mt-4">
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 text-orange-800">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Admin Access Only</span>
                </div>
                <p className="text-xs text-orange-700 mt-1">
                  This area is restricted to authorized government administrators only.
                </p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminUsername">Admin Username</Label>
                  <Input 
                    id="adminUsername" 
                    type="text" 
                    value={adminUsername} 
                    onChange={(e) => setAdminUsername(e.target.value)} 
                    placeholder="Enter admin username"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <Input 
                    id="adminPassword" 
                    type="password" 
                    value={adminPassword} 
                    onChange={(e) => setAdminPassword(e.target.value)} 
                    placeholder="Enter admin password"
                    required 
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700">
                  <Shield className="w-4 h-4 mr-2" />
                  {loading ? "Authenticating..." : "Admin Login"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
