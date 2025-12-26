
export interface Prompt {
  id: string;
  useCase: string;
  prompt: string;
  category: string;
  toolCompatibility: string[];
  promptType: string;
  description: string;
  sheet: string; // Original sheet name for reference
  title?: string;
  tags?: string[];
  createdAt?: string;
  customPromptId?: string;
  usagePhase?: string; // foundation, build, enhance, refine, content
}

export interface LiveDemo {
  url: string;
  title: string;
  source: string;
}

export interface Video {
  url: string;
  title: string;
}

export interface CodePenExample {
  url: string;
  title: string;
}

export interface ExampleImage {
  url: string;
  title: string;
  description: string;
}

export interface VisualExample {
  promptType: string;
  description: string;
  liveDemos: LiveDemo[];
  videos: Video[];
  codepen: CodePenExample[];
  images?: ExampleImage[];
}

export interface CategoryExamples {
  categoryName: string;
  examples: VisualExample[];
}

export interface ProcessedData {
  prompts: Prompt[];
  visualExamples: CategoryExamples[];
  metadata: {
    totalPrompts: number;
    totalCategories: number;
    categories: string[];
    promptTypes: string[];
    toolCompatibility: string[];
  };
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedUseCases: string[];
  showFavoritesOnly: boolean;
  showRecentlyAdded: boolean;
  selectedUsagePhase: string; // '', 'foundation', 'build', 'enhance', 'refine', 'content'
}

export interface FavoritesManager {
  favorites: Set<string>;
  addFavorite: (promptId: string) => void;
  removeFavorite: (promptId: string) => void;
  isFavorite: (promptId: string) => boolean;
  clearFavorites: () => void;
}
