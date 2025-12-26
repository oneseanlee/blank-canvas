/**
 * Hierarchical Category Configuration
 * Organizes prompts into logical parent groups for better navigation
 */

export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  categories: string[];
  description: string;
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'design',
    name: '🎨 Design & Visuals',
    icon: 'Palette',
    description: 'UI/UX design, layouts, luxury aesthetics, and visual components',
    categories: [
      'Ultra-Luxury Design',
      'Visuals',
      'Layout',
      'Motion'
    ]
  },
  {
    id: 'content',
    name: '✍️ Content & Copy',
    icon: 'FileText',
    description: 'Copywriting, messaging, and content strategy',
    categories: [
      'Content & Copywriting'
    ]
  },
  {
    id: 'build',
    name: '⚙️ Build & Code',
    icon: 'Code',
    description: 'Components, libraries, systems, databases, and full builds',
    categories: [
      'Components',
      'Library',
      'System',
      'Database',
      'Full Build'
    ]
  },
  {
    id: 'optimize',
    name: '🚀 Optimize & Polish',
    icon: 'Zap',
    description: 'CRO, refinement, QA, testing, and performance',
    categories: [
      'CRO',
      'Refine',
      'QA'
    ]
  }
];

/**
 * Get the parent group for a given category
 */
export function getParentGroup(category: string): CategoryGroup | undefined {
  return CATEGORY_GROUPS.find(group => 
    group.categories.includes(category)
  );
}

/**
 * Get all categories in a flattened array
 */
export function getAllCategories(): string[] {
  return CATEGORY_GROUPS.flatMap(group => group.categories);
}

/**
 * Get category counts organized by parent groups
 */
export function organizeCountsByGroup(
  categoryCounts: Map<string, number>
): Map<string, { total: number; categories: Map<string, number> }> {
  const groupCounts = new Map<string, { total: number; categories: Map<string, number> }>();
  
  CATEGORY_GROUPS.forEach(group => {
    let total = 0;
    const categories = new Map<string, number>();
    
    group.categories.forEach(category => {
      const count = categoryCounts.get(category) || 0;
      total += count;
      categories.set(category, count);
    });
    
    groupCounts.set(group.id, { total, categories });
  });
  
  return groupCounts;
}
