'use client'

import { usePathname } from 'next/navigation'
import CMSBottomNav from '@/components/layout/CMSSidebar'

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/cms/login'

  if (isLoginPage) return <>{children}</>

  return (
    <div className="min-h-screen bg-neutral-off-white pb-16">
      <main className="overflow-auto">
        {children}
      </main>
      <CMSBottomNav />
    </div>
  )
}
