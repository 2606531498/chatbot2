import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Chat Assistant',
  description: 'Your intelligent chat companion',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white touch-manipulation">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  )
}