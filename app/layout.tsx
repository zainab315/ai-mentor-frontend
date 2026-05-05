import "./globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google' 
import 'react-toastify/dist/ReactToastify.css';  
import { Toaster } from "@/components/ui/toaster"
import StoreProvider from '@/providers/StoreProvider'
import ApolloProvider from '@/providers/AppoloProvider'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Mentor Platform',
  description: 'Your personalized learning journey starts here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <StoreProvider>
            <ApolloProvider>
              {children}
              <Toaster />
            </ApolloProvider>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}