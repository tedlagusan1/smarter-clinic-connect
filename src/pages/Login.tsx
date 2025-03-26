
import React from "react";
import { Link } from "react-router-dom";
import { Shell, SiteHeader } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally authenticate the user
    console.log("Login attempt with:", { email, password });
    // For demo purposes, redirect to dashboard
    window.location.href = "/dashboard";
  };
  
  return (
    <Shell header={<SiteHeader />}>
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="glass-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
              <CardDescription>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <p className="text-xs text-muted-foreground">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="underline">Terms of Service</Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Login;
