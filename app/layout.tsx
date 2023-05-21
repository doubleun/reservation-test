import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Room Reservation App',
  description: 'Test Room Reservation',
}

const LayoutTwClass = `bg-white`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + LayoutTwClass}>{children}</body>
    </html>
  )
}
