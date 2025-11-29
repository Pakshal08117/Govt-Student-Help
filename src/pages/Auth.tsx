import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { districts } from "@/data/locations";
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

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        navigate(from, { replace: true });
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate(from, { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate, from]);

  const canonicalHref = useMemo(() => (typeof window !== "undefined" ? `${window.location.origin}/auth` : "/auth"), []);


  const { signIn, error, clearError } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    
    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        toast({ title: "Logged in", description: "Welcome back!" });
        navigate(from, { replace: true });
      } else {
        toast({ 
          title: "Login failed", 
          description: result.error || "Please check your credentials and try again.", 
          variant: "destructive" as any 
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast({ 
        title: "Login failed", 
        description: err?.message || "An unexpected error occurred. Please try again.", 
        variant: "destructive" as any 
      });
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
          toast({ 
            title: "Check your email", 
            description: "We sent you a confirmation link to complete your registration. If you don't receive it, check your spam folder or contact support." 
          });
        } else {
          // User is already confirmed (email confirmation disabled)
          toast({ 
            title: "Account created!", 
            description: "Welcome to MahaHelp Desk!" 
          });
          // Redirect immediately since no email confirmation is needed
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1500);
        }
      }
    } catch (err: any) {
      toast({ title: "Signup failed", description: err?.message || "Please try again.", variant: "destructive" as any });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | MahaHelp Desk</title>
        <meta name="description" content="Login or create an account to access MahaHelp Desk services." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>
      <section className="container mx-auto px-4 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Login to MahaHelp Desk</h1>
        <div className="max-w-md mx-auto bg-card border rounded-lg p-6 shadow-sm">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
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
          </Tabs>
        </div>
      </section>
    </>
  );
}
