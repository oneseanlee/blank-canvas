import { Suspense } from 'react';
import { VibeCodingBible } from '@/components/vibe-coding-bible';
import { LoadingSpinner } from '@/components/loading-spinner';
import { MatrixBackground } from '@/components/matrix-background';
import { UserHeader } from '@/components/layout/UserHeader';

export function Dashboard() {
  return (
    <div className="min-h-screen relative z-0 bg-background">
      <MatrixBackground />
      <UserHeader />
      <main className="min-h-screen pt-16">
        <Suspense fallback={<LoadingSpinner />}>
          <VibeCodingBible />
        </Suspense>
      </main>
    </div>
  );
}
