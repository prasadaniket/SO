import { AuthProvider } from '@/context/AuthContext'
import CMSBottomNav from '@/components/layout/CMSSidebar'

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-neutral-off-white pb-16">
        <main className="overflow-auto">{children}</main>
        <CMSBottomNav />
      </div>
    </AuthProvider>
  )
}
