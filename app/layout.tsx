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
    <html lang="zh" className="h-full bg-gray-50">
      <body className="h-full">{children}</body>
    </html>
  )
}