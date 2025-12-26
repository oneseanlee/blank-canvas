import { Suspense } from 'react'
import { VibeCodingBible } from '@/components/vibe-coding-bible'
import { LoadingSpinner } from '@/components/loading-spinner'
import { MatrixBackground } from '@/components/matrix-background'
import { Toaster } from '@/components/ui/toaster'

export default function App() {
  return (
    <div className="min-h-screen relative z-0 bg-black/60">
      <MatrixBackground />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <VibeCodingBible />
        </Suspense>
      </main>
      <Toaster />
    </div>
  )
}
