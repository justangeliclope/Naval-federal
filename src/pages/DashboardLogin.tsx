import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import LoginRestricted from './LoginRestricted';

interface DashboardLoginProps {
  onSuccess?: () => void;
}

export default function DashboardLogin({ onSuccess }: DashboardLoginProps) {
  const [ssn, setSsn] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isRestricted } = useAuth();
  const { toast } = useToast();

  if (isRestricted) {
    return <LoginRestricted />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const trimmedSsn = ssn.trim();
      const trimmedPassword = password.trim();
      const result = await login({ ssn: trimmedSsn, password: trimmedPassword });
      if (result.success) {
        toast({ title: "Login Successful", description: "Welcome to dashboard. Email sent!" });
        onSuccess?.();
      } else if (result.restricted) {
        // Restriction is handled by isRestricted check above; no misleading toast needed
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid login details"
        });
      }
    } catch {
      toast({ variant: "destructive", title: "Login Error", description: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-20 h-20 bg-gradient-to-r from-orange to-orange-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">Secure Login</CardTitle>
          <p className="text-muted-foreground">Enter your SSN to access dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="ssn" className="text-sm font-medium">SSN</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="ssn"
                  type="password"
                  placeholder="****"
                  className="pl-10"
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange to-orange-dark hover:from-orange-dark" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="pt-4 text-center">
              <Button 
                type="button" 
                variant="link" 
                className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground"
                onClick={() => toast({
                  title: "Forgot Password?",
                  description: "Please contact support to reset your password."
                })}
              >
                Forgot Password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

