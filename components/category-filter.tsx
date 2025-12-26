
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Search, X, Filter } from 'lucide-react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { ScrollArea } from './ui/scroll-area'
import { Input } from './ui/input'
import { CATEGORY_GROUPS, organizeCountsByGroup } from '@/lib/category-groups'

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onChange: (categories: string[]) => void
  categoryCounts?: Map<string, number>
}

export function CategoryFilter({ categories, selectedCategories, onChange, categoryCounts = new Map() }: CategoryFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['design', 'content', 'build', 'optimize'])
  )

  const groupedCounts = organizeCountsByGroup(categoryCounts)

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    onChange(updated)
  }

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  const handleGroupSelectAll = (groupCategories: string[]) => {
    const allSelected = groupCategories.every(cat => selectedCategories.includes(cat))
    
    if (allSelected) {
      onChange(selectedCategories.filter(cat => !groupCategories.includes(cat)))
    } else {
      const newCategories = [...new Set([...selectedCategories, ...groupCategories])]
      onChange(newCategories)
    }
  }

  // Filter groups based on search
  const filteredGroups = CATEGORY_GROUPS.map(group => {
    const filteredCategories = group.categories.filter(cat =>
      cat.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return { ...group, categories: filteredCategories }
  }).filter(group => 
    group.categories.length > 0 || 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Filter by Category</h3>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 h-9 text-sm bg-black/50 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-2">
        <div className="space-y-2">
          {filteredGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id)
            const groupData = groupedCounts.get(group.id)
            const allGroupCategoriesSelected = group.categories.every(cat => 
              selectedCategories.includes(cat)
            )

            return (
              <div key={group.id} className="border border-green-500/20 rounded-lg bg-black/30 overflow-hidden">
                {/* Group Header */}
                <div className="p-2.5 bg-black/40">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-center gap-2 flex-1 text-left hover:text-green-400 transition-colors min-w-0"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-green-400 flex-shrink-0" />
                      )}
                      <span className="font-semibold text-sm text-white truncate">
                        {group.name}
                      </span>
                      <span className="text-xs text-green-400 font-mono flex-shrink-0">
                        ({groupData?.total || 0})
                      </span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleGroupSelectAll(group.categories)
                      }}
                      className="text-xs text-green-400 hover:text-green-300 transition-colors px-2 py-0.5 rounded border border-green-500/30 hover:border-green-500/50 flex-shrink-0"
                    >
                      {allGroupCategoriesSelected ? 'Clear' : 'All'}
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <p className="text-xs text-gray-400 mt-1.5 ml-6 leading-snug">
                      {group.description}
                    </p>
                  )}
                </div>

                {/* Group Categories */}
                {isExpanded && (
                  <div className="p-2 space-y-1">
                    {group.categories.map((category) => {
                      const count = categoryCounts.get(category) || 0
                      return (
                        <div
                          key={category}
                          className="flex items-center space-x-2 py-1 px-2 rounded hover:bg-green-500/5 transition-colors"
                        >
                          <Checkbox
                            id={`${group.id}-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                            className="border-green-500/50 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          />
                          <label
                            htmlFor={`${group.id}-${category}`}
                            className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors flex items-center gap-2 flex-1 min-w-0"
                          >
                            <span className="truncate">{category}</span>
                            <span className="text-xs text-green-400 font-mono flex-shrink-0">
                              ({count})
                            </span>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No categories found matching "{searchQuery}"</p>
          </div>
        )}
      </ScrollArea>

      {/* Selected Count & Clear */}
      {selectedCategories.length > 0 && (
        <div className="pt-3 border-t border-green-500/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 text-xs">
              {selectedCategories.length} selected
            </span>
            <button
              onClick={() => onChange([])}
              className="text-green-400 hover:text-green-300 transition-colors text-xs font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
