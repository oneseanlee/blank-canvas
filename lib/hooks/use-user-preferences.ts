'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { useAuth } from '@/lib/auth-context';

interface UserPreferences {
  hasCompletedOnboarding: boolean;
  preferredView: 'card' | 'compact';
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    hasCompletedOnboarding: false,
    preferredView: 'card'
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  // Load preferences from Supabase
  useEffect(() => {
    if (!user) {
      setIsLoaded(true);
      return;
    }

    async function loadPreferences() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // Not found is okay
          throw error;
        }

        if (data) {
          setPreferences({
            hasCompletedOnboarding: (data as { has_completed_onboarding?: boolean }).has_completed_onboarding || false,
            preferredView: ((data as { preferred_view?: string }).preferred_view as 'card' | 'compact') || 'card'
          });
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadPreferences();
  }, [user]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    if (!user) return;

    // Optimistic update
    setPreferences(prev => ({ ...prev, ...updates }));

    try {
      const dbUpdates: Record<string, unknown> = {};
      if (updates.hasCompletedOnboarding !== undefined) {
        dbUpdates.has_completed_onboarding = updates.hasCompletedOnboarding;
      }
      if (updates.preferredView !== undefined) {
        dbUpdates.preferred_view = updates.preferredView;
      }

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...dbUpdates
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  }, [user]);

  const completeOnboarding = useCallback(() => {
    updatePreferences({ hasCompletedOnboarding: true });
  }, [updatePreferences]);

  const setPreferredView = useCallback((view: 'card' | 'compact') => {
    updatePreferences({ preferredView: view });
  }, [updatePreferences]);

  return {
    preferences,
    isLoaded,
    updatePreferences,
    completeOnboarding,
    setPreferredView
  };
}
