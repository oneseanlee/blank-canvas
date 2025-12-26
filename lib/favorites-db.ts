
'use client'

import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from database
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch('/api/favorites')
        if (response.ok) {
          const data = await response.json()
          setFavorites(new Set(data.favoriteIds || []))
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadFavorites()
  }, [])

  const addFavorite = async (promptId: string) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId }),
      })

      if (response.ok) {
        setFavorites(prev => new Set(prev).add(promptId))
      }
    } catch (error) {
      console.error('Error adding favorite:', error)
    }
  }

  const removeFavorite = async (promptId: string) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId }),
      })

      if (response.ok) {
        setFavorites(prev => {
          const newSet = new Set(prev)
          newSet.delete(promptId)
          return newSet
        })
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  const toggleFavorite = async (promptId: string) => {
    if (favorites.has(promptId)) {
      await removeFavorite(promptId)
    } else {
      await addFavorite(promptId)
    }
  }

  const clearFavorites = async () => {
    // Clear all favorites - would need a new API endpoint for this
    // For now, just clear locally
    setFavorites(new Set())
  }

  const isFavorite = (promptId: string) => favorites.has(promptId)

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    isLoaded,
  }
}
