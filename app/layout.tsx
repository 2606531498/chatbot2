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
        {/* 确保在生产环境中也加载 Tailwind CSS */}
        <link 
          href="https://unpkg.com/tailwindcss@^3/dist/tailwind.min.css" 
          rel="stylesheet" 
        />
      </head>
      <body className="h-full bg-gradient-to-b from-gray-50 to-white">
        {children}
      </body>
    </html>
  )
}