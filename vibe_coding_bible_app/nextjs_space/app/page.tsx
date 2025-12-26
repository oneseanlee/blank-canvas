
import { Suspense } from 'react'
import { VibeCodingBible } from '@/components/vibe-coding-bible'
import { LoadingSpinner } from '@/components/loading-spinner'
import { UserHeader } from '@/components/user-header'

export default function HomePage() {
  return (
    <>
      <UserHeader />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <VibeCodingBible />
        </Suspense>
      </main>
    </>
  )
}
