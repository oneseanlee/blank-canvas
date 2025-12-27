'use client';

import { useState } from 'react';
import { Copy, Heart, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Prompt, CategoryExamples } from '@/lib/types';

interface CompactPromptListProps {
  prompts: Prompt[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (prompt: string) => void;
  onViewExamples: (prompt: Prompt) => void;
  findRelatedExamples: (prompt: Prompt) => CategoryExamples[];
}

export function CompactPromptList({
  prompts,
  isFavorite,
  onToggleFavorite,
  onCopy,
  onViewExamples,
  findRelatedExamples
}: CompactPromptListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {prompts.map(prompt => {
        const isExpanded = expandedId === prompt.id;
        const hasExamples = findRelatedExamples(prompt).length > 0;

        return (
          <div
            key={prompt.id}
            className="bg-card border border-border rounded-lg overflow-hidden transition-all hover:border-primary/50"
          >
            {/* Collapsed Row */}
            <div
              className="flex items-center gap-3 p-3 cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : prompt.id)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(prompt.id);
                }}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite(prompt.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
                />
              </Button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground truncate">
                    {prompt.useCase || prompt.title || 'Prompt'}
                  </span>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {prompt.category}
                  </Badge>
                  {prompt.usagePhase && (
                    <Badge variant="secondary" className="shrink-0 text-xs capitalize">
                      {prompt.usagePhase}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(prompt.prompt);
                  }}
                >
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </Button>

                {hasExamples && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewExamples(prompt);
                    }}
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}

                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="px-3 pb-3 pt-0 border-t border-border/50">
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {prompt.prompt}
                  </p>
                </div>

                {prompt.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {prompt.description}
                  </p>
                )}

                {prompt.toolCompatibility && prompt.toolCompatibility.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {prompt.toolCompatibility.map(tool => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
