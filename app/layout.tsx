import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Python Code Examples',
  description: 'Upload, share, and run Python code examples',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}