
'use client'

import { useState } from 'react'
import { 
  X, 
  ExternalLink, 
  Play, 
  Code,
  Eye,
  Globe,
  Video,
  Monitor,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Prompt, CategoryExamples, VisualExample } from '@/lib/types'

interface VisualExamplesProps {
  prompt: Prompt
  examples: CategoryExamples | null
  onClose: () => void
}

export function VisualExamples({ prompt, examples, onClose }: VisualExamplesProps) {
  const [selectedExample, setSelectedExample] = useState<VisualExample | null>(null)

  if (!examples) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Visual Examples - {prompt.category}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <Monitor className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              No examples found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Visual examples are not available for this category yet.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const allExamples = examples.examples || []
  const hasLiveDemos = allExamples.some(ex => ex.liveDemos?.length > 0)
  const hasVideos = allExamples.some(ex => ex.videos?.length > 0)
  const hasCodePen = allExamples.some(ex => ex.codepen?.length > 0)
  const hasImages = allExamples.some(ex => (ex.images?.length ?? 0) > 0)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visual Examples - {examples.categoryName}
          </DialogTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Related to: {prompt.useCase}
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue={hasImages ? "examples" : "live-demos"} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="examples" disabled={!hasImages}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Examples ({allExamples.reduce((acc, ex) => acc + (ex.images?.length || 0), 0)})
              </TabsTrigger>
              <TabsTrigger value="live-demos" disabled={!hasLiveDemos}>
                <Globe className="h-4 w-4 mr-2" />
                Live ({allExamples.reduce((acc, ex) => acc + (ex.liveDemos?.length || 0), 0)})
              </TabsTrigger>
              <TabsTrigger value="videos" disabled={!hasVideos}>
                <Video className="h-4 w-4 mr-2" />
                Videos ({allExamples.reduce((acc, ex) => acc + (ex.videos?.length || 0), 0)})
              </TabsTrigger>
              <TabsTrigger value="codepen" disabled={!hasCodePen}>
                <Code className="h-4 w-4 mr-2" />
                CodePen ({allExamples.reduce((acc, ex) => acc + (ex.codepen?.length || 0), 0)})
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="examples" className="space-y-6 mt-0">
                {allExamples.map((example, exIndex) => (
                  (example.images?.length ?? 0) > 0 && (
                    <div key={exIndex} className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {example.promptType}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {example.description}
                        </p>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        {example.images?.map((img, index) => (
                          <Card key={index} className="group hover:shadow-lg transition-shadow overflow-hidden">
                            <CardContent className="p-4">
                              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                                <Image
                                  src={img.url}
                                  alt={img.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                              <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-1">
                                {img.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                {img.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </TabsContent>

              <TabsContent value="live-demos" className="space-y-6 mt-0">
                {allExamples.map((example, exIndex) => (
                  example.liveDemos?.length > 0 && (
                    <div key={exIndex} className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {example.promptType}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {example.description}
                        </p>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {example.liveDemos.map((demo, index) => (
                          <Card key={index} className="group hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-start justify-between gap-2">
                                <span className="line-clamp-2">{demo.title}</span>
                                <Badge variant="outline" className="text-xs shrink-0">
                                  {demo.source}
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(demo.url, '_blank')}
                                className="w-full"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Live Demo
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </TabsContent>

              <TabsContent value="videos" className="space-y-6 mt-0">
                {allExamples.map((example, exIndex) => (
                  example.videos?.length > 0 && (
                    <div key={exIndex} className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {example.promptType}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {example.description}
                        </p>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        {example.videos.map((video, index) => (
                          <Card key={index} className="group hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm line-clamp-2">
                                {video.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(video.url, '_blank')}
                                className="w-full"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Watch Video
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </TabsContent>

              <TabsContent value="codepen" className="space-y-6 mt-0">
                {allExamples.map((example, exIndex) => (
                  example.codepen?.length > 0 && (
                    <div key={exIndex} className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {example.promptType}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {example.description}
                        </p>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        {example.codepen.map((pen, index) => (
                          <Card key={index} className="group hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm line-clamp-2">
                                {pen.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(pen.url, '_blank')}
                                className="w-full"
                              >
                                <Code className="h-4 w-4 mr-2" />
                                View CodePen
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
