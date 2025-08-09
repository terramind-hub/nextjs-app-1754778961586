import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { authOptions } from '@/lib/auth'
import Header from '@/components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECommerce Store',
  description: 'A modern ecommerce application with product catalog, shopping cart, and checkout',
  keywords: ['ecommerce', 'shopping', 'products', 'online store'],
  authors: [{ name: 'ECommerce Store' }],
  openGraph: {
    title: 'ECommerce Store',
    description: 'A modern ecommerce application with product catalog, shopping cart, and checkout',
    type: 'website',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="min-h-screen bg-background">
            <Header />
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}