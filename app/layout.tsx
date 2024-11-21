import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Chat Assistant',
  description: 'Your intelligent chat companion',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://api.deepseek.com" />
        <link rel="dns-prefetch" href="https://api.deepseek.com" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white touch-manipulation">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  )
}