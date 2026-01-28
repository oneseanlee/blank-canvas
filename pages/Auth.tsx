import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MatrixBackground } from '@/components/matrix-background';
import { ArrowLeft, Loader2, Mail, Lock, User, PlayCircle } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
});

// Demo credentials - safe to expose as this is a read-only demo account
const DEMO_EMAIL = 'demo@vibecodingbible.com';
const DEMO_PASSWORD = 'demo123456';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    try {
      const { error } = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Demo login failed',
          description: 'Please try again or create your own account.',
        });
      } else {
        toast({
          title: 'Welcome to the demo!',
          description: 'Explore the Vibe Coding Bible with demo access.',
        });
        navigate('/app', { replace: true });
      }
    } finally {
      setIsDemoLoading(false);
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate('/app', { replace: true });
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse({ email, password });
      } else {
        signupSchema.parse({ email, password, fullName });
      }
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        e.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Login failed',
            description: error.message === 'Invalid login credentials' 
              ? 'Invalid email or password. Please try again.'
              : error.message,
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully signed in.',
          });
          navigate('/app', { replace: true });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          // Handle specific error cases
          if (error.message.includes('already registered')) {
            toast({
              variant: 'destructive',
              title: 'Account exists',
              description: 'This email is already registered. Please sign in instead.',
            });
            setIsLogin(true);
          } else {
            toast({
              variant: 'destructive',
              title: 'Signup failed',
              description: error.message,
            });
          }
        } else {
          toast({
            title: 'Account created!',
            description: 'Welcome to Vibe Coding Bible.',
          });
          navigate('/app', { replace: true });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative z-0 bg-background flex items-center justify-center px-4">
      <MatrixBackground />
      
      {/* Back to home */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </button>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <span className="text-primary font-mono text-2xl font-bold">VCB</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin 
              ? 'Sign in to access your prompts' 
              : 'Get started with Vibe Coding Bible'}
          </p>
        </div>
        
        {/* Form Card */}
        <div className="rounded-xl border border-primary/20 bg-card/50 backdrop-blur-md p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (signup only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
            )}
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>
          
          {/* Demo Login Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleDemoLogin}
            disabled={isDemoLoading || isLoading}
            className="w-full border-primary/30 hover:bg-primary/10 font-semibold py-5"
          >
            {isDemoLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading demo...
              </>
            ) : (
              <>
                <PlayCircle className="w-4 h-4 mr-2" />
                Try Demo Account
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            No signup required — explore the app instantly
          </p>
          
          {/* Toggle */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
              disabled={isLoading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
