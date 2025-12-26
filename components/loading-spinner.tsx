
import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
        <p className="text-slate-600 dark:text-slate-400">Loading Vibe Coding Bible...</p>
      </div>
    </div>
  )
}
