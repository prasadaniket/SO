'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/cms/dashboard', label: 'Dashboard' },
  { href: '/cms/customers', label: 'Customers' },
  { href: '/cms/reviews', label: 'Reviews' },
  { href: '/cms/visits', label: 'Visits' },
  { href: '/cms/automation', label: 'Auto' },
]

export default function CMSBottomNav() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-white/10 z-50">
      <div className="flex items-stretch">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors',
              pathname === item.href
                ? 'text-primary bg-white/5'
                : 'text-neutral-light'
            )}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium text-neutral-light"
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}
