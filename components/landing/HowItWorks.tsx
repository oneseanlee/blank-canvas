import { Search, Copy, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse & Search',
    description: 'Explore prompts by category or use the search to find exactly what you need for your current task.',
  },
  {
    icon: Copy,
    step: '02',
    title: 'Copy & Customize',
    description: 'One-click copy any prompt and customize it to fit your specific project requirements.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Build Faster',
    description: 'Paste into your AI coding assistant and watch your development velocity soar.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Three simple steps to transform your development workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 to-primary/10" />
              )}
              
              {/* Step Number */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full border-2 border-primary/30 bg-background flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {item.step}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
