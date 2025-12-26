
import * as XLSX from 'xlsx';
import { Prompt, ProcessedData, CategoryExamples } from './types';

// Function to process Excel data from all sheets
export async function processExcelData(): Promise<{prompts: Prompt[], categories: string[]}> {
  try {
    const response = await fetch('/Vibe Coding Bible.xlsx');
    if (!response?.ok) {
      throw new Error(`Failed to fetch Excel file: ${response?.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    if (!workbook?.SheetNames?.length) {
      throw new Error('No sheets found in Excel file');
    }
    
    const prompts: Prompt[] = [];
    const categories = new Set<string>();
    
    // Skip the Quick Reference Guide sheet as it has different format
    const sheetsToProcess = workbook?.SheetNames?.filter?.(sheet => 
      sheet && !sheet.includes?.('Quick Reference Guide')
    ) || [];
    
    sheetsToProcess.forEach?.((sheetName, sheetIndex) => {
      if (!sheetName || !workbook?.Sheets?.[sheetName]) return;
      
      try {
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils?.sheet_to_json?.(worksheet) as any[] || [];
        
        sheetData.forEach?.((row, rowIndex) => {
          if (!row) return;
          
          const useCase = row?.['Use Case'];
          const promptText = row?.['Prompt'];
          
          if (useCase && promptText) {
            const toolCompatibilityString = row?.['Tool Compatibility'];
            const toolCompatibilityArray = toolCompatibilityString 
              ? String(toolCompatibilityString).split(',').map((tool: string) => tool?.trim?.() || '').filter(Boolean)
              : [];
            
            const categoryName = row?.['Category'] || sheetName?.replace?.(/[^\w\s]/g, '')?.trim?.() || 'Uncategorized';
            
            const prompt: Prompt = {
              id: `${sheetIndex}-${rowIndex}`,
              useCase: String(useCase || ''),
              prompt: String(promptText || ''),
              category: String(categoryName),
              toolCompatibility: toolCompatibilityArray,
              promptType: String(row?.['Prompt Type'] || 'General'),
              description: String(row?.['Description/Notes'] || ''),
              sheet: String(sheetName || '')
            };
            
            prompts.push(prompt);
            categories.add(prompt.category);
          }
        });
      } catch (sheetError) {
        console.warn(`Error processing sheet ${sheetName}:`, sheetError);
      }
    });
    
    return {
      prompts: prompts || [],
      categories: Array.from(categories || []).sort()
    };
  } catch (error) {
    console.error('Error processing Excel data:', error);
    // Return empty data instead of throwing to prevent app crash
    return {
      prompts: [],
      categories: []
    };
  }
}

// Function to load visual examples
export async function loadVisualExamples(): Promise<CategoryExamples[]> {
  try {
    const response = await fetch('/vibe_coding_examples.json');
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error loading visual examples:', error);
    return [];
  }
}

// Function to load custom prompts from the database
export async function loadCustomPrompts(): Promise<Prompt[]> {
  try {
    const response = await fetch('/api/custom-prompts');
    if (!response.ok) {
      console.warn('Failed to fetch custom prompts:', response.status);
      return [];
    }
    
    const data = await response.json();
    const customPrompts = data.customPrompts || [];
    
    // Convert custom prompts to the Prompt format
    return customPrompts.map((cp: any, index: number) => ({
      id: `custom-${cp.id}`,
      useCase: cp.useCase || cp.category || 'Custom Prompt',
      prompt: cp.prompt,
      category: cp.category || 'Custom',
      toolCompatibility: cp.toolsNeeded || [],
      promptType: 'Custom',
      description: cp.description || cp.title || '',
      sheet: 'Custom Prompts',
      title: cp.title,
      tags: cp.tags || [],
      createdAt: cp.createdAt, // Keep the creation date
      customPromptId: cp.id, // Store original DB ID
      usagePhase: cp.usagePhase // Add usage phase
    }));
  } catch (error) {
    console.error('Error loading custom prompts:', error);
    return [];
  }
}

// Function to process all data
export async function loadAllData(): Promise<ProcessedData> {
  try {
    // Load only from database and visual examples (no more Excel file loading)
    const [visualExamples, customPrompts] = await Promise.all([
      loadVisualExamples(),
      loadCustomPrompts()
    ]);
    
    // All prompts now come from the database
    const allPrompts = customPrompts;
    
    const allToolCompatibility = new Set<string>();
    const allPromptTypes = new Set<string>();
    const allCategories = new Set<string>();
    
    allPrompts.forEach(prompt => {
      prompt.toolCompatibility.forEach(tool => allToolCompatibility.add(tool));
      allPromptTypes.add(prompt.promptType);
      if (prompt.category) {
        allCategories.add(prompt.category);
      }
    });
    
    return {
      prompts: allPrompts,
      visualExamples,
      metadata: {
        totalPrompts: allPrompts.length,
        totalCategories: allCategories.size,
        categories: Array.from(allCategories).sort(),
        promptTypes: Array.from(allPromptTypes).sort(),
        toolCompatibility: Array.from(allToolCompatibility).sort()
      }
    };
  } catch (error) {
    console.error('Error loading all data:', error);
    throw error;
  }
}

// Search and filter functions
export function searchPrompts(
  prompts: Prompt[], 
  query: string, 
  selectedCategories: string[] = [],
  selectedUseCases: string[] = [],
  favoriteIds: Set<string> = new Set(),
  showFavoritesOnly: boolean = false,
  showRecentlyAdded: boolean = false,
  selectedUsagePhase: string = ''
): Prompt[] {
  if (!prompts?.length) return [];
  
  try {
    let filtered = [...prompts];
    
    // Filter by recently added (last 30 days)
    if (showRecentlyAdded) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      filtered = filtered.filter(prompt => {
        if (!prompt?.createdAt) return false;
        const createdDate = new Date(prompt.createdAt);
        return createdDate >= thirtyDaysAgo;
      });
      
      // Sort by creation date (newest first)
      filtered.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
    
    // Filter by favorites first if needed
    if (showFavoritesOnly) {
      filtered = filtered.filter(prompt => 
        prompt?.id && favoriteIds?.has?.(prompt.id)
      );
    }
    
    // Filter by categories
    if (selectedCategories?.length > 0) {
      filtered = filtered.filter(prompt => 
        prompt?.category && selectedCategories.includes(prompt.category)
      );
    }
    
    // Filter by use cases
    if (selectedUseCases?.length > 0) {
      filtered = filtered.filter(prompt => {
        if (!prompt?.useCase) return false;
        
        return selectedUseCases.some(useCase => {
          const promptUseCase = String(prompt.useCase || '').toLowerCase();
          const searchUseCase = String(useCase || '').toLowerCase();
          return promptUseCase.includes(searchUseCase);
        });
      });
    }
    
    // Filter by usage phase
    if (selectedUsagePhase) {
      filtered = filtered.filter(prompt => 
        prompt?.usagePhase === selectedUsagePhase
      );
    }
    
    // Text search across all fields
    const cleanQuery = String(query || '').trim();
    if (cleanQuery) {
      const searchTerms = cleanQuery.toLowerCase().split(' ').filter(term => term && term.length > 0);
      filtered = filtered.filter(prompt => {
        if (!prompt) return false;
        
        const searchableText = `
          ${prompt.useCase || ''} 
          ${prompt.prompt || ''} 
          ${prompt.category || ''} 
          ${prompt.promptType || ''} 
          ${prompt.description || ''}
          ${(prompt.toolCompatibility || []).join(' ')}
        `.toLowerCase();
        
        return searchTerms.every(term => searchableText.includes(term));
      });
    }
    
    return filtered || [];
  } catch (error) {
    console.warn('Error in searchPrompts:', error);
    return [];
  }
}

// Get unique use cases for filtering
export function getUniqueUseCases(prompts: Prompt[]): string[] {
  if (!prompts?.length) return [];
  
  try {
    const useCases = new Set<string>();
    prompts.forEach?.(prompt => {
      if (prompt?.useCase) {
        useCases.add(String(prompt.useCase));
      }
    });
    return Array.from(useCases || []).sort() || [];
  } catch (error) {
    console.warn('Error in getUniqueUseCases:', error);
    return [];
  }
}

// Find related visual examples for a prompt
export function findRelatedExamples(
  prompt: Prompt, 
  visualExamples: CategoryExamples[]
): CategoryExamples | null {
  if (!prompt?.category || !visualExamples?.length) {
    return null;
  }
  
  try {
    // Try to match by category name (clean up emojis and special chars)
    const cleanCategoryName = String(prompt.category || '')
      .replace?.(/[^\w\s]/g, '')?.trim?.()?.toLowerCase?.() || '';
    
    if (!cleanCategoryName) return null;
    
    return visualExamples.find(cat => {
      if (!cat?.categoryName) return false;
      
      const cleanExampleCat = String(cat.categoryName || '')
        .replace?.(/[^\w\s]/g, '')?.trim?.()?.toLowerCase?.() || '';
      
      return cleanExampleCat && cleanCategoryName && (
        cleanExampleCat.includes(cleanCategoryName) || 
        cleanCategoryName.includes(cleanExampleCat)
      );
    }) || null;
  } catch (error) {
    console.warn('Error in findRelatedExamples:', error);
    return null;
  }
}
