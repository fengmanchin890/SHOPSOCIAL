import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/contexts/i18n-context'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  )
}