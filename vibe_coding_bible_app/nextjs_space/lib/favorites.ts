
'use client';

import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'vibe-coding-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const favoritesArray = JSON.parse(stored);
        setFavorites(new Set(favoritesArray));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites: Set<string>) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavorites)));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = (promptId: string) => {
    const newFavorites = new Set(favorites);
    newFavorites.add(promptId);
    saveFavorites(newFavorites);
  };

  const removeFavorite = (promptId: string) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(promptId);
    saveFavorites(newFavorites);
  };

  const isFavorite = (promptId: string) => favorites.has(promptId);

  const toggleFavorite = (promptId: string) => {
    if (isFavorite(promptId)) {
      removeFavorite(promptId);
    } else {
      addFavorite(promptId);
    }
  };

  const clearFavorites = () => {
    saveFavorites(new Set());
  };

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearFavorites
  };
}
