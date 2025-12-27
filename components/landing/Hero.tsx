import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">194+ Expert AI Prompts</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="text-foreground">Master AI-Powered</span>
          <br />
          <span className="text-primary drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
            Development
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The ultimate collection of curated prompts for vibe coding. 
          Transform your development workflow with battle-tested prompts across 
          <span className="text-primary font-medium"> 13 categories</span> and 
          <span className="text-primary font-medium"> 5 workflow phases</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-primary/30 hover:bg-primary/10 px-8 py-6 text-lg"
          >
            Learn More
          </Button>
        </div>

        {/* Social Proof */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">194+</span>
            <span className="text-sm">Curated Prompts</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">13</span>
            <span className="text-sm">Categories</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">5</span>
            <span className="text-sm">Workflow Phases</span>
          </div>
        </div>
      </div>
    </section>
  );
}
