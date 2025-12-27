'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { SearchBar } from './search-bar';
import { CategoryFilter } from './category-filter';

interface MobileFilterDrawerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  categoryCounts: Map<string, number>;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export function MobileFilterDrawer({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategories,
  onCategoryChange,
  categoryCounts,
  onClearFilters,
  activeFilterCount
}: MobileFilterDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            placeholder="Search prompts..."
          />

          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onChange={onCategoryChange}
            categoryCounts={categoryCounts}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
