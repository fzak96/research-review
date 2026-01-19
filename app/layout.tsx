import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tax Research Review',
  description: 'Review and verify tax determination data with legal citations',
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
