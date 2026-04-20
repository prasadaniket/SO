import type { Metadata, Viewport } from 'next'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'StoneOven CMS',
  description: 'StoneOven Restaurant Management Portal',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F26522',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: { borderRadius: '8px', fontSize: '14px' },
            success: { style: { background: '#27AE60', color: '#fff' } },
            error: { style: { background: '#E74C3C', color: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
