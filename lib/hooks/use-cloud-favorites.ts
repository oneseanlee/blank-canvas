'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { useAuth } from '@/lib/auth-context';

export function useCloudFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  // Load favorites from Supabase
  useEffect(() => {
    if (!user) {
      setFavorites(new Set());
      setIsLoaded(true);
      return;
    }

    async function loadFavorites() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('prompt_id')
          .eq('user_id', user.id);

        if (error) throw error;

        const favoriteIds = data?.map(f => f.prompt_id) || [];
        setFavorites(new Set(favoriteIds));
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadFavorites();
  }, [user]);

  const addFavorite = useCallback(async (promptId: string) => {
    if (!user) return;

    // Optimistic update
    setFavorites(prev => new Set(prev).add(promptId));

    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: user.id, prompt_id: promptId });

      if (error && error.code !== '23505') { // Ignore duplicate key errors
        throw error;
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      // Rollback on error
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(promptId);
        return newSet;
      });
    }
  }, [user]);

  const removeFavorite = useCallback(async (promptId: string) => {
    if (!user) return;

    // Optimistic update
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(promptId);
      return newSet;
    });

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', promptId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Rollback on error
      setFavorites(prev => new Set(prev).add(promptId));
    }
  }, [user]);

  const isFavorite = useCallback((promptId: string) => favorites.has(promptId), [favorites]);

  const toggleFavorite = useCallback(async (promptId: string) => {
    if (isFavorite(promptId)) {
      await removeFavorite(promptId);
    } else {
      await addFavorite(promptId);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  const clearFavorites = useCallback(async () => {
    if (!user) return;

    setFavorites(new Set());

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }, [user]);

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
