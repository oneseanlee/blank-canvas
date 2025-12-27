import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CallToAction } from '@/components/landing/CallToAction';
import { MatrixBackground } from '@/components/matrix-background';

export function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to the app
  useEffect(() => {
    if (!loading && user) {
      navigate('/app', { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen relative z-0 bg-background">
      <MatrixBackground />
      
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-mono text-sm font-bold">VCB</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Vibe Coding Bible</span>
          </div>
          
          <button
            onClick={() => navigate('/auth')}
            className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>
      
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-primary/10">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vibe Coding Bible. Built with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  );
}
