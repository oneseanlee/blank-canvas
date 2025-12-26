
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { MatrixBackground } from '@/components/matrix-background'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: 'Vibe Coding Bible - AI Companion for Developers',
  description: 'The ultimate collection of 306+ AI coding prompts across 21 categories with visual examples, live demos, and copyable templates for faster development.',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Vibe Coding Bible - AI Companion for Developers',
    description: 'The ultimate collection of 306+ AI coding prompts across 21 categories with visual examples, live demos, and copyable templates for faster development.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Bible - AI Companion for Developers',
    description: 'The ultimate collection of 306+ AI coding prompts across 21 categories with visual examples, live demos, and copyable templates for faster development.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <MatrixBackground />
            <div className="min-h-screen relative z-0 bg-black/60">
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
