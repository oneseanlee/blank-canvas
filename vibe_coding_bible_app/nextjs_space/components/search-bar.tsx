
'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
}

export function SearchBar({ searchQuery, onSearchChange, placeholder = "Search..." }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(localQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [localQuery, onSearchChange])

  // Sync with external changes
  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  const handleClear = () => {
    setLocalQuery('')
    onSearchChange('')
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-white">
        Search Prompts
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-10 pr-10 shadow-sm"
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}
