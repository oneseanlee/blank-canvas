
'use client';

import React from 'react';
import { ArrowRight, Sparkles, Building, Palette, RefreshCw, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UsagePhaseProps {
  onSelectPhase: (phase: string) => void;
  selectedPhase: string;
}

export function UsageGuide({ onSelectPhase, selectedPhase }: UsagePhaseProps) {
  const phases = [
    {
      id: 'foundation',
      icon: Sparkles,
      title: '1. Foundation',
      description: 'Set the vibe, establish personas, and define the core system',
      examples: ['System prompts', 'Personas', 'Design standards', 'Core setup'],
      color: 'from-purple-500 to-pink-500',
      badge: 'bg-purple-500',
    },
    {
      id: 'content',
      icon: FileText,
      title: '2. Content',
      description: 'Write persuasive copy using proven frameworks',
      examples: ['AIDA', 'Hormozi', 'PAS', 'StoryBrand', 'Sales copy', 'CTA optimization'],
      color: 'from-yellow-500 to-amber-500',
      badge: 'bg-yellow-500',
    },
    {
      id: 'build',
      icon: Building,
      title: '3. Build',
      description: 'Create the core structure, layouts, and components',
      examples: ['Full builds', 'Layout systems', 'Components', 'Pages', 'Backend setup'],
      color: 'from-blue-500 to-cyan-500',
      badge: 'bg-blue-500',
    },
    {
      id: 'enhance',
      icon: Palette,
      title: '4. Enhance',
      description: 'Add animations, visual polish, and library integrations',
      examples: ['Motion design', 'Visual effects', 'Libraries', 'Advanced interactions'],
      color: 'from-green-500 to-emerald-500',
      badge: 'bg-green-500',
    },
    {
      id: 'refine',
      icon: RefreshCw,
      title: '5. Refine',
      description: 'Polish, optimize mobile responsiveness, and ensure above-the-fold perfection',
      examples: ['Mobile-friendly', 'Responsive design', 'Polish', 'Above-the-fold', 'CRO', 'Testing'],
      color: 'from-orange-500 to-red-500',
      badge: 'bg-orange-500',
    },
  ];

  return (
    <div className="w-full mb-8">
      <Card className="bg-black/95 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-green-400" />
            Vibe Coding SOP: Your Workflow Guide
          </CardTitle>
          <CardDescription className="text-gray-300">
            Follow this proven workflow to build high-converting, polished web experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop View: Horizontal Flow */}
          <div className="hidden md:flex items-center justify-between gap-4 mb-6">
            {phases.map((phase, index) => (
              <React.Fragment key={phase.id}>
                <button
                  onClick={() => onSelectPhase(phase.id)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedPhase === phase.id
                      ? 'border-green-400 bg-green-900/20 shadow-lg shadow-green-500/20'
                      : 'border-gray-700 bg-black/60 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${phase.color}`}>
                      <phase.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-white">{phase.title}</h3>
                      <p className="text-xs text-gray-400">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {phase.examples.slice(0, 3).map((ex, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </button>
                {index < phases.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-green-400 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile View: Vertical Stack */}
          <div className="md:hidden space-y-3">
            {phases.map((phase, index) => (
              <React.Fragment key={phase.id}>
                <button
                  onClick={() => onSelectPhase(phase.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedPhase === phase.id
                      ? 'border-green-400 bg-green-900/20 shadow-lg shadow-green-500/20'
                      : 'border-gray-700 bg-black/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${phase.color} flex-shrink-0`}>
                      <phase.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-sm font-bold text-white mb-1">{phase.title}</h3>
                      <p className="text-xs text-gray-400 mb-2">{phase.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {phase.examples.map((ex, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                            {ex}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
                {index < phases.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-green-400 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Pro Tips */}
          <div className="mt-6 p-4 bg-green-900/10 border border-green-500/30 rounded-lg">
            <h4 className="text-sm font-bold text-green-400 mb-2">💡 Pro Tips:</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• <strong>Start with Foundation</strong> prompts to set your design direction and system</li>
              <li>• <strong>Write Content</strong> early to define your messaging and value proposition</li>
              <li>• <strong>Use Build</strong> prompts to create your core structure and components</li>
              <li>• <strong>Add Enhance</strong> prompts for animations, visuals, and advanced features</li>
              <li>• <strong>Apply Refine</strong> prompts to polish, ensure mobile responsiveness, and optimize above-the-fold content</li>
              <li>• <strong>Mix and match</strong> - This is a flexible guide, not a rigid rulebook!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
