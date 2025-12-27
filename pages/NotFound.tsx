import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { MatrixBackground } from '@/components/matrix-background';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative z-0 bg-background flex items-center justify-center px-4">
      <MatrixBackground />
      
      <div className="text-center space-y-6 relative z-10">
        <div className="text-8xl font-bold text-primary drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
          404
        </div>
        <h1 className="text-2xl font-semibold text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
