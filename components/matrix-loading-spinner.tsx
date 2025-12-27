'use client';

export function MatrixLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {/* Matrix-style animated spinner */}
        <div className="relative w-20 h-20 mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          
          {/* Inner glow */}
          <div className="absolute inset-3 bg-primary/10 rounded-full animate-pulse" />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary font-mono text-lg font-bold">VCB</span>
          </div>
        </div>

        {/* Loading text with matrix effect */}
        <div className="space-y-2">
          <p className="text-primary font-mono text-lg animate-pulse">
            Loading Vibe Coding Bible
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        <p className="text-muted-foreground text-sm">
          Preparing your AI coding companion...
        </p>
      </div>
    </div>
  );
}
