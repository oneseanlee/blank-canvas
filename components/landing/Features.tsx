import { BookOpen, Target, Layers, Star, Zap, Palette } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: '194+ Expert Prompts',
    description: 'Access a comprehensive library of battle-tested prompts for every development scenario.',
  },
  {
    icon: Target,
    title: '13 Curated Categories',
    description: 'Organized categories from UI/UX design to performance optimization and everything in between.',
  },
  {
    icon: Layers,
    title: '5-Phase Workflow',
    description: 'Follow a structured approach: Foundation → Build → Enhance → Refine → Content.',
  },
  {
    icon: Star,
    title: 'Favorites System',
    description: 'Save your most-used prompts for quick access and build your personal collection.',
  },
  {
    icon: Zap,
    title: 'Copy & Use Instantly',
    description: 'One-click copy functionality to paste prompts directly into your AI coding assistant.',
  },
  {
    icon: Palette,
    title: 'Visual Examples',
    description: 'See real examples of what each prompt can achieve with visual references.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need to
            <span className="text-primary"> Code Smarter</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A complete toolkit designed to supercharge your AI-assisted development workflow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
