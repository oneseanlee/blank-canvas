

import { BookOpen, TrendingUp, Filter, Heart } from 'lucide-react'

interface StatsHeaderProps {
  totalPrompts: number
  totalCategories: number
  filteredCount: number
  favoritesCount: number
}

export function StatsHeader({ 
  totalPrompts, 
  totalCategories, 
  filteredCount, 
  favoritesCount 
}: StatsHeaderProps) {
  return (
    <div className="bg-black/95 border-b border-green-500/30 backdrop-blur-md shadow-lg shadow-green-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 bg-green-900/20 p-3 rounded-xl border border-green-500/30 hover:shadow-md hover:shadow-green-500/20 transition-all">
            <div className="bg-green-600 p-3 rounded-lg shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {totalPrompts}
              </p>
              <p className="text-sm font-semibold text-gray-300">Total Prompts</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-green-900/20 p-3 rounded-xl border border-green-500/30 hover:shadow-md hover:shadow-green-500/20 transition-all">
            <div className="bg-green-600 p-3 rounded-lg shadow-md">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {totalCategories}
              </p>
              <p className="text-sm font-semibold text-gray-300">Categories</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-green-900/20 p-3 rounded-xl border border-green-500/30 hover:shadow-md hover:shadow-green-500/20 transition-all">
            <div className="bg-green-600 p-3 rounded-lg shadow-md">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {filteredCount}
              </p>
              <p className="text-sm font-semibold text-gray-300">Filtered Results</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-green-900/20 p-3 rounded-xl border border-green-500/30 hover:shadow-md hover:shadow-green-500/20 transition-all">
            <div className="bg-green-600 p-3 rounded-lg shadow-md">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {favoritesCount}
              </p>
              <p className="text-sm font-semibold text-gray-300">Favorites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
