import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const LoginRestricted: React.FC = () => {
  const [overridePassword, setOverridePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { unlock, restrictionReason } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isSuccessRestriction = restrictionReason === 'successful';

  const handleOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = unlock(overridePassword.trim());
      if (success) {
        toast({
          title: 'Access Restored',
          description: 'Override password accepted. Please log in with your credentials.',
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid Override Password',
          description: 'Please contact your unit administrator for assistance.',
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-card text-card-foreground rounded-2xl shadow-2xl border border-border p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {isSuccessRestriction ? 'Account Restricted' : 'Access Restricted'}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isSuccessRestriction
                ? 'Personnel has been restricted due to new login location for personnel redeployed from the United States. Please enter the override password to regain access.'
                : 'Too many failed login attempts have been detected. Your account has been temporarily restricted. Please enter the override password to regain access.'}
            </p>
          </div>

          <div className="pt-2 text-xs text-muted-foreground font-mono uppercase tracking-label">
            {isSuccessRestriction ? 'Error Code: LOGIN-SUCCESS-LIMIT-403' : 'Error Code: LOGIN-ATTEMPT-402'}
          </div>

          <form onSubmit={handleOverride} className="space-y-4 text-left">
            <div className="grid gap-2">
              <label htmlFor="override-password" className="text-sm font-medium flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                Override Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="override-password"
                  type="password"
                  placeholder="Enter override password"
                  className="pl-10"
                  value={overridePassword}
                  onChange={(e) => setOverridePassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange to-orange-dark hover:from-orange-dark"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Unlock Access'}
            </Button>
          </form>

          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground"
            onClick={() =>
              toast({
                title: 'Need Help?',
                description: 'Contact your unit administrator or call support.',
              })
            }
          >
            Contact Support
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRestricted;
