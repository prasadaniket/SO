import Link from 'next/link'

interface HeaderProps {
  outletName?: string
  outletLocation?: string
}

export default function Header({ outletName, outletLocation }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">StoneOven</span>
        </Link>
        {outletName && (
          <div className="text-right">
            <p className="text-sm font-semibold text-secondary leading-tight">{outletName}</p>
            {outletLocation && (
              <p className="text-xs text-secondary-light">{outletLocation}</p>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
