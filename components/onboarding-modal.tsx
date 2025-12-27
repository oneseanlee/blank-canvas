'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Book, Search, Heart, Map, Layers, Zap, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface OnboardingModalProps {
  open: boolean;
  onComplete: () => void;
}

const steps = [
  {
    icon: Book,
    title: "Welcome to Vibe Coding Bible",
    description: "Your ultimate collection of AI-powered prompts for building beautiful, production-ready applications. Let's take a quick tour!",
    tip: "Over 500+ curated prompts organized by workflow phase"
  },
  {
    icon: Map,
    title: "Follow the SOP Guide",
    description: "Our Standard Operating Procedure guides you through 5 phases: Foundation → Build → Enhance → Refine → Content. Start from the top for best results.",
    tip: "Click any phase to filter prompts for that stage"
  },
  {
    icon: Search,
    title: "Search & Filter",
    description: "Use the search bar to find specific prompts, or filter by category. Press '/' to focus search instantly.",
    tip: "Keyboard shortcuts: / search, f favorites, r recent"
  },
  {
    icon: Heart,
    title: "Save Your Favorites",
    description: "Click the heart icon to save prompts you love. Your favorites sync across sessions so you never lose them.",
    tip: "Toggle 'Favorites' in the header to show only saved prompts"
  },
  {
    icon: Layers,
    title: "Card or Compact View",
    description: "Switch between detailed card view or compact list view using the toggle in the header. Choose what works best for you.",
    tip: "Compact view is great for quickly scanning through prompts"
  },
  {
    icon: Zap,
    title: "You're Ready!",
    description: "Start by exploring the Foundation phase prompts to set up your project structure, then work your way through each phase.",
    tip: "Pro tip: Copy prompts with one click and paste directly into your AI tool"
  }
];

export function OnboardingModal({ open, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-card border-primary/30">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl text-foreground">{step.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step.description}
          </DialogDescription>
        </DialogHeader>

        {/* Tip Box */}
        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-primary">{step.tip}</p>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground"
          >
            Skip tour
          </Button>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button onClick={handleNext}>
              {isLastStep ? (
                <>
                  Get Started
                  <Zap className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
