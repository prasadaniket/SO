'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const ownerNav = [
  { href: '/dashboard',  label: 'Dashboard' },
  { href: '/customers',  label: 'Customers' },
  { href: '/reviews',    label: 'Reviews'   },
  { href: '/visits',     label: 'Visits'    },
  { href: '/automation', label: 'Auto'      },
]

const franchiseNav = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/customers', label: 'Customers' },
  { href: '/reviews',   label: 'Reviews'   },
  { href: '/visits',    label: 'Visits'    },
]

export default function CMSBottomNav() {
  const pathname = usePathname()
  const { logout, isOwner } = useAuth()

  const navItems = isOwner ? ownerNav : franchiseNav

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-white/10 z-50"
      style={{ maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <div className="flex items-stretch">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors',
              pathname === item.href
                ? 'text-gradient-primary bg-white/5'
                : 'text-neutral-light hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium text-neutral-light hover:text-red-400 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}
