import { Suspense } from 'react';
import { VibeCodingBible } from '@/components/vibe-coding-bible';
import { MatrixLoadingSpinner } from '@/components/matrix-loading-spinner';
import { MatrixBackground } from '@/components/matrix-background';

export function Dashboard() {
  return (
    <div className="min-h-screen relative z-0 bg-background dark">
      <MatrixBackground />
      <main className="min-h-screen">
        <Suspense fallback={<MatrixLoadingSpinner />}>
          <VibeCodingBible />
        </Suspense>
      </main>
    </div>
  );
}
