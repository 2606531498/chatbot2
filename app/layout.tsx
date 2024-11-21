import './globals.css'

export const metadata = {
  title: 'AI Chat Assistant',
  description: 'Your intelligent chat companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="h-full bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {children}
      </body>
    </html>
  )
}