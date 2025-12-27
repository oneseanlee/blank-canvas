import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterPillsProps {
  searchQuery: string;
  selectedCategories: string[];
  selectedUsagePhase: string;
  showFavoritesOnly: boolean;
  showRecentlyAdded: boolean;
  onClearSearch: () => void;
  onRemoveCategory: (category: string) => void;
  onClearPhase: () => void;
  onClearFavorites: () => void;
  onClearRecent: () => void;
  onClearAll: () => void;
}

export function FilterPills({
  searchQuery,
  selectedCategories,
  selectedUsagePhase,
  showFavoritesOnly,
  showRecentlyAdded,
  onClearSearch,
  onRemoveCategory,
  onClearPhase,
  onClearFavorites,
  onClearRecent,
  onClearAll
}: FilterPillsProps) {
  const hasFilters = searchQuery || selectedCategories.length > 0 || selectedUsagePhase || showFavoritesOnly || showRecentlyAdded;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-card/50 rounded-lg border border-border/50 mb-4">
      <span className="text-sm text-muted-foreground mr-2">Active filters:</span>

      {searchQuery && (
        <Pill label={`Search: "${searchQuery}"`} onRemove={onClearSearch} />
      )}

      {selectedCategories.map(category => (
        <Pill key={category} label={category} onRemove={() => onRemoveCategory(category)} color="primary" />
      ))}

      {selectedUsagePhase && (
        <Pill label={`Phase: ${selectedUsagePhase}`} onRemove={onClearPhase} color="accent" />
      )}

      {showFavoritesOnly && (
        <Pill label="Favorites" onRemove={onClearFavorites} color="destructive" />
      )}

      {showRecentlyAdded && (
        <Pill label="Recently Added" onRemove={onClearRecent} color="secondary" />
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="ml-auto text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  );
}

interface PillProps {
  label: string;
  onRemove: () => void;
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive';
}

function Pill({ label, onRemove, color = 'default' }: PillProps) {
  const colorClasses = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent/20 text-accent-foreground',
    destructive: 'bg-destructive/20 text-destructive'
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${colorClasses[color]}`}>
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-foreground/10 rounded-full p-0.5 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
