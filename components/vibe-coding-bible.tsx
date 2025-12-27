'use client'

import { useState, useEffect, useMemo } from 'react'
import { SearchBar } from './search-bar'
import { CategoryFilter } from './category-filter'
import { PromptCard } from './prompt-card'
import { VisualExamples } from './visual-examples'
import { StatsHeader } from './stats-header'
import { MatrixLoadingSpinner } from './matrix-loading-spinner'
import { SkeletonList } from './skeleton-card'
import { UsageGuide } from './usage-guide'
import { UnifiedHeader } from './layout/UnifiedHeader'
import { FilterPills } from './filter-pills'
import { BackToTop } from './back-to-top'
import { MobileFilterDrawer } from './mobile-filter-drawer'
import { CompactPromptList } from './compact-prompt-list'
import { OnboardingModal } from './onboarding-modal'
import { useCloudFavorites } from '@/lib/hooks/use-cloud-favorites'
import { useUserPreferences } from '@/lib/hooks/use-user-preferences'
import { loadAllData, searchPrompts, getUniqueUseCases, findRelatedExamples } from '@/lib/data-processor'
import { ProcessedData, Prompt, FilterState } from '@/lib/types'
import { Book, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'

export function VibeCodingBible() {
  const [data, setData] = useState<ProcessedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [showGuide, setShowGuide] = useState(true)
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
    toggleFavorite
  } = useCloudFavorites()

  const {
    preferences,
    isLoaded: preferencesLoaded,
    completeOnboarding,
    setPreferredView
  } = useUserPreferences()

  // Show onboarding modal for new users
  const [showOnboarding, setShowOnboarding] = useState(false)
  
  useEffect(() => {
    if (preferencesLoaded && !preferences.hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [preferencesLoaded, preferences.hasCompletedOnboarding])

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false)
    completeOnboarding()
  }

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
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === '/') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (searchInput) searchInput.focus()
      }

      if (e.key === 'f') {
        e.preventDefault()
        handleToggleFavorites()
      }

      if (e.key === 'r') {
        e.preventDefault()
        handleToggleRecentlyAdded()
      }

      if (e.key === 'v') {
        e.preventDefault()
        setPreferredView(preferences.preferredView === 'card' ? 'compact' : 'card')
      }

      if (e.key === '?') {
        e.preventDefault()
        toast({
          title: '⌨️ Keyboard Shortcuts',
          description: '/ search • f favorites • r recent • v toggle view • ? help',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filters, toast, preferences.preferredView, setPreferredView])

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

  // Count active filters for mobile badge
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.searchQuery) count++
    count += filters.selectedCategories.length
    if (filters.selectedUsagePhase) count++
    return count
  }, [filters])

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

  const handleToggleFavorites = () => {
    setFilters(prev => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }))
  }

  const handleToggleRecentlyAdded = () => {
    setFilters(prev => ({ ...prev, showRecentlyAdded: !prev.showRecentlyAdded }))
  }

  const handleSelectPhase = (phase: string) => {
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
    return <MatrixLoadingSpinner />
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="text-destructive mb-4">
            <RefreshCw className="h-12 w-12 mx-auto" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            {error || 'Failed to load data'}
          </h1>
          <p className="text-muted-foreground mb-4">
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
      {/* Onboarding Modal */}
      <OnboardingModal 
        open={showOnboarding} 
        onComplete={handleCompleteOnboarding} 
      />

      {/* Unified Header */}
      <UnifiedHeader
        showGuide={showGuide}
        onToggleGuide={() => setShowGuide(!showGuide)}
        showFavoritesOnly={filters.showFavoritesOnly}
        onToggleFavorites={handleToggleFavorites}
        showRecentlyAdded={filters.showRecentlyAdded}
        onToggleRecentlyAdded={handleToggleRecentlyAdded}
        favoritesCount={favorites.size}
        favoritesLoaded={favoritesLoaded}
        preferredView={preferences.preferredView}
        onViewChange={setPreferredView}
      />

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
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <MobileFilterDrawer
            searchQuery={filters.searchQuery}
            onSearchChange={handleSearchChange}
            categories={data?.metadata?.categories || []}
            selectedCategories={filters.selectedCategories}
            onCategoryChange={handleCategoryChange}
            categoryCounts={categoryCounts}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Active Filter Pills */}
        <FilterPills
          searchQuery={filters.searchQuery}
          selectedCategories={filters.selectedCategories}
          selectedUsagePhase={filters.selectedUsagePhase}
          showFavoritesOnly={filters.showFavoritesOnly}
          showRecentlyAdded={filters.showRecentlyAdded}
          onClearSearch={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
          onRemoveCategory={(cat) => setFilters(prev => ({ 
            ...prev, 
            selectedCategories: prev.selectedCategories.filter(c => c !== cat) 
          }))}
          onClearPhase={() => setFilters(prev => ({ ...prev, selectedUsagePhase: '' }))}
          onClearFavorites={() => setFilters(prev => ({ ...prev, showFavoritesOnly: false }))}
          onClearRecent={() => setFilters(prev => ({ ...prev, showRecentlyAdded: false }))}
          onClearAll={handleClearFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Search & Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-card rounded-xl shadow-lg border border-border backdrop-blur-sm p-6 space-y-6 sticky top-20">
              <SearchBar 
                searchQuery={filters.searchQuery}
                onSearchChange={handleSearchChange}
                placeholder="Search prompts, use cases, or tools..."
              />

              <CategoryFilter
                categories={data?.metadata?.categories || []}
                selectedCategories={filters.selectedCategories || []}
                onChange={handleCategoryChange}
                categoryCounts={categoryCounts}
              />

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
                <div className="text-center py-12 bg-card rounded-xl shadow-lg border border-border backdrop-blur-sm">
                  <Book className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {loading ? 'Loading prompts...' : 'No prompts found'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {loading ? 'Please wait while we load your data.' : 'Try adjusting your search or filters to find more prompts.'}
                  </p>
                  {!loading && (
                    <Button variant="outline" onClick={handleClearFilters} className="shadow-md">
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : preferences.preferredView === 'compact' ? (
                <CompactPromptList
                  prompts={filteredPrompts}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onCopy={handleCopyPrompt}
                  onViewExamples={setSelectedPrompt}
                  findRelatedExamples={(prompt) => findRelatedExamples(prompt, data?.visualExamples || [])}
                />
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

      {/* Back to Top Button */}
      <BackToTop />

      {/* Visual Examples Modal */}
      {selectedPrompt && (
        <VisualExamples
          prompt={selectedPrompt}
          examples={findRelatedExamples(selectedPrompt, data.visualExamples) || []}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </div>
  )
}
