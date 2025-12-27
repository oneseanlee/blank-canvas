import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Terminal className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to <span className="text-primary">Supercharge</span> Your Coding?
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Join developers who are building faster with AI-powered prompts. 
              Get instant access to 194+ expert prompts.
            </p>
            
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-semibold shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300"
            >
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Free to get started • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
