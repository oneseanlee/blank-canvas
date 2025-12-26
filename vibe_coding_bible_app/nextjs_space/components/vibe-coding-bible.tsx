
'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { SearchBar } from './search-bar'
import { CategoryFilter } from './category-filter'
import { PromptCard } from './prompt-card'
import { VisualExamples } from './visual-examples'
import { StatsHeader } from './stats-header'
import { LoadingSpinner } from './loading-spinner'
import { UsageGuide } from './usage-guide'
import { useFavorites } from '@/lib/favorites-db'
import { loadAllData, searchPrompts, getUniqueUseCases, findRelatedExamples } from '@/lib/data-processor'
import { ProcessedData, Prompt, FilterState } from '@/lib/types'
import { Book, Heart, RefreshCw, Keyboard, Clock, Map } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'

export function VibeCodingBible() {
  const [data, setData] = useState<ProcessedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [showGuide, setShowGuide] = useState(true) // Show guide by default
  const { toast } = useToast()

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    selectedUseCases: [],
    showFavoritesOnly: false,
    showRecentlyAdded: false,
    selectedUsagePhase: ''
  })

  const { 
    favorites, 
    isLoaded: favoritesLoaded, 
    isFavorite, 
    toggleFavorite, 
    clearFavorites 
  } = useFavorites()

  // Load data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const processedData = await loadAllData()
        setData(processedData)
      } catch (err) {
        console.error('Failed to load data:', err)
        setError('Failed to load data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // / - Focus search
      if (e.key === '/') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }

      // f - Toggle favorites
      if (e.key === 'f') {
        e.preventDefault()
        handleToggleFavorites()
      }

      // r - Toggle recently added
      if (e.key === 'r') {
        e.preventDefault()
        handleToggleRecentlyAdded()
      }

      // ? - Show keyboard shortcuts (toast notification)
      if (e.key === '?') {
        e.preventDefault()
        toast({
          title: '⌨️ Keyboard Shortcuts',
          description: '/ - Focus search • f - Toggle favorites • r - Recently added • ? - Show shortcuts',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filters, toast])

  // Filter and search prompts
  const filteredPrompts = useMemo(() => {
    if (!data?.prompts?.length) return []
    
    return searchPrompts(
      data.prompts || [],
      filters.searchQuery,
      filters.selectedCategories,
      filters.selectedUseCases,
      favorites,
      filters.showFavoritesOnly,
      filters.showRecentlyAdded,
      filters.selectedUsagePhase
    ) || []
  }, [data, filters, favorites])

  // Get unique use cases for filter
  const uniqueUseCases = useMemo(() => {
    if (!data?.prompts?.length) return []
    return getUniqueUseCases(data.prompts || []) || []
  }, [data])

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts = new window.Map<string, number>()
    if (!data?.prompts?.length) return counts
    data.prompts.forEach(prompt => {
      if (prompt?.category) {
        counts.set(prompt.category, (counts.get(prompt.category) || 0) + 1)
      }
    })
    return counts
  }, [data])

  // Handle copy to clipboard
  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast({
        title: "Copied to clipboard!",
        description: "Prompt has been copied and ready to use.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try selecting and copying manually.",
        variant: "destructive"
      })
    }
  }

  // Handle filter changes
  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }))
  }

  const handleCategoryChange = (categories: string[]) => {
    setFilters(prev => ({ ...prev, selectedCategories: categories }))
  }

  const handleUseCaseChange = (useCases: string[]) => {
    setFilters(prev => ({ ...prev, selectedUseCases: useCases }))
  }

  const handleToggleFavorites = () => {
    setFilters(prev => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }))
  }

  const handleToggleRecentlyAdded = () => {
    setFilters(prev => ({ ...prev, showRecentlyAdded: !prev.showRecentlyAdded }))
  }

  const handleSelectPhase = (phase: string) => {
    // Toggle phase: if same phase is clicked, clear it; otherwise set it
    setFilters(prev => ({ 
      ...prev, 
      selectedUsagePhase: prev.selectedUsagePhase === phase ? '' : phase 
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategories: [],
      selectedUseCases: [],
      showFavoritesOnly: false,
      showRecentlyAdded: false,
      selectedUsagePhase: ''
    })
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <RefreshCw className="h-12 w-12 mx-auto" />
          </div>
          <h1 className="text-xl font-semibold text-white">
            {error || 'Failed to load data'}
          </h1>
          <p className="text-gray-300 mb-4">
            There was an issue loading the Vibe Coding Bible. Please try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b-2 border-green-500/30 shadow-lg shadow-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-3 rounded-xl shadow-lg shadow-green-500/50">
                <Book className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-400">
                  Vibe Coding Bible
                </h1>
                <p className="text-sm font-medium text-white hidden sm:block">
                  Your AI coding companion
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={showGuide ? "default" : "outline"}
                size="sm"
                onClick={() => setShowGuide(!showGuide)}
                className="shadow-md"
              >
                <Map className={`h-4 w-4 mr-2 ${showGuide ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">SOP Guide</span>
                <span className="sm:hidden">SOP</span>
              </Button>
              
              <Button
                variant={filters.showRecentlyAdded ? "default" : "outline"}
                size="sm"
                onClick={handleToggleRecentlyAdded}
                className="shadow-md"
              >
                <Clock className={`h-4 w-4 mr-2 ${filters.showRecentlyAdded ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Recently Added</span>
                <span className="sm:hidden">Recent</span>
              </Button>
              
              <Button
                variant={filters.showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={handleToggleFavorites}
                disabled={!favoritesLoaded}
                className="shadow-md"
              >
                <Heart className={`h-4 w-4 mr-2 ${filters.showFavoritesOnly ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Favorites ({favorites.size})</span>
                <span className="sm:hidden">({favorites.size})</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: '⌨️ Keyboard Shortcuts',
                    description: '/ - Focus search • f - Toggle favorites • r - Recently added • ? - Show shortcuts',
                  })
                }}
                className="shadow-md hidden md:flex"
              >
                <Keyboard className="h-4 w-4 mr-2" />
                Shortcuts
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Header */}
      <StatsHeader 
        totalPrompts={data?.metadata?.totalPrompts || 0}
        totalCategories={data?.metadata?.totalCategories || 0}
        filteredCount={filteredPrompts?.length || 0}
        favoritesCount={favorites?.size || 0}
      />

      {/* Usage Guide (SOP) */}
      {showGuide && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <UsageGuide 
            onSelectPhase={handleSelectPhase}
            selectedPhase={filters.selectedUsagePhase}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Search & Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black/90 rounded-xl shadow-lg border-2 border-green-500/30 backdrop-blur-sm p-6 space-y-6">
              {/* Search */}
              <SearchBar 
                searchQuery={filters.searchQuery}
                onSearchChange={handleSearchChange}
                placeholder="Search prompts, use cases, or tools..."
              />

              {/* Category Filter */}
              <CategoryFilter
                categories={data?.metadata?.categories || []}
                selectedCategories={filters.selectedCategories || []}
                onChange={handleCategoryChange}
                categoryCounts={categoryCounts}
              />

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearFilters}
                className="w-full shadow-md hover:shadow-lg transition-all"
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Main Content - Prompts */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results */}
            <div className="space-y-4">
              {(!filteredPrompts || filteredPrompts.length === 0) ? (
                <div className="text-center py-12 bg-black/90 rounded-xl shadow-lg border-2 border-green-500/30 backdrop-blur-sm">
                  <Book className="h-12 w-12 mx-auto text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {loading ? 'Loading prompts...' : 'No prompts found'}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {loading ? 'Please wait while we load your data.' : 'Try adjusting your search or filters to find more prompts.'}
                  </p>
                  {!loading && (
                    <Button variant="outline" onClick={handleClearFilters} className="shadow-md">
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredPrompts?.map?.((prompt) => {
                    if (!prompt?.id) return null;
                    
                    return (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        isFavorite={isFavorite(prompt.id)}
                        onToggleFavorite={() => toggleFavorite(prompt.id)}
                        onCopy={() => handleCopyPrompt(prompt?.prompt || '')}
                        onViewExamples={() => setSelectedPrompt(prompt)}
                        relatedExamples={findRelatedExamples(prompt, data?.visualExamples || [])}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Examples Modal */}
      {selectedPrompt && (
        <VisualExamples
          prompt={selectedPrompt}
          examples={findRelatedExamples(selectedPrompt, data.visualExamples)}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </div>
  )
}
