
'use client'

import { useState } from 'react'
import { 
  Copy, 
  Heart, 
  Edit3, 
  Eye, 
  Check, 
  Tag, 
  Folder,
  Zap,
  ExternalLink
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'
import { Prompt, CategoryExamples } from '@/lib/types'

interface PromptCardProps {
  prompt: Prompt
  isFavorite: boolean
  onToggleFavorite: () => void
  onCopy: () => void
  onViewExamples?: () => void
  relatedExamples?: CategoryExamples | null
}

export function PromptCard({ 
  prompt, 
  isFavorite, 
  onToggleFavorite, 
  onCopy,
  onViewExamples,
  relatedExamples
}: PromptCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPrompt, setEditedPrompt] = useState(prompt.prompt)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const textToCopy = isEditing ? editedPrompt : prompt.prompt
    
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      onCopy()
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save the edited version
      setIsEditing(false)
    } else {
      // Start editing
      setEditedPrompt(prompt.prompt)
      setIsEditing(true)
    }
  }

  const hasExamples = relatedExamples && (
    relatedExamples.examples?.some(ex => 
      ex.liveDemos?.length > 0 || 
      ex.videos?.length > 0 || 
      ex.codepen?.length > 0
    )
  )

  // Check if prompt was added within last 7 days
  const isNewPrompt = prompt.createdAt && (() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(prompt.createdAt) >= sevenDaysAgo;
  })();

  return (
    <Card className="group hover:shadow-xl transition-all duration-200 border-2 border-green-500/30 hover:border-green-500 bg-black/90 backdrop-blur-sm hover:shadow-green-500/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs font-semibold shadow-sm">
                <Folder className="h-3 w-3 mr-1" />
                {prompt.category}
              </Badge>
              <Badge variant="outline" className="text-xs font-semibold shadow-sm">
                <Tag className="h-3 w-3 mr-1" />
                {prompt.promptType}
              </Badge>
              {isNewPrompt && (
                <Badge className="text-xs font-bold bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-500/50 animate-pulse">
                  ✨ NEW
                </Badge>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-white leading-tight">
              {prompt.useCase}
            </h3>
            
            {prompt.description && (
              <p className="text-sm font-medium text-gray-300 leading-relaxed">
                {prompt.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFavorite}
              className={`h-8 w-8 p-0 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tool Compatibility */}
        {prompt.toolCompatibility?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prompt.toolCompatibility.map((tool) => (
              <Badge key={tool} variant="outline" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                {tool}
              </Badge>
            ))}
          </div>
        )}

        <Separator />

        {/* Prompt Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white">
              Prompt Template
            </label>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditToggle}
                className="h-8 px-2 text-xs"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                {isEditing ? 'Done' : 'Edit'}
              </Button>
            </div>
          </div>

          {isEditing ? (
            <Textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="min-h-[120px] text-sm font-mono shadow-sm"
              placeholder="Customize your prompt here..."
            />
          ) : (
            <div className="bg-black/50 rounded-lg p-4 border-2 border-green-500/30 shadow-sm">
              <pre className="text-sm font-mono font-medium text-green-100 whitespace-pre-wrap leading-relaxed">
                {prompt.prompt}
              </pre>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopy}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy {isEditing ? 'Edited' : 'Prompt'}
                </>
              )}
            </Button>

            {hasExamples && onViewExamples && (
              <Button
                variant="outline"
                size="sm"
                onClick={onViewExamples}
                className="flex-1 sm:flex-none"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Examples
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
