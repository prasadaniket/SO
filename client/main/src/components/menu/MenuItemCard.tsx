import type { MenuItem } from '@/types/menu'

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const displayPrice = item.price
    ? `₹${item.price}`
    : item.priceVariants
    ? Object.entries(item.priceVariants)
        .map(([k, v]) => `${k}: ₹${v}`)
        .join(' | ')
    : null

  return (
    <div className="flex items-start gap-3 py-4 border-b border-neutral-light last:border-0">
      <div className="flex-shrink-0 mt-0.5">
        <span className={`text-lg ${item.isVeg ? 'text-success' : 'text-error'}`}>
          {item.isVeg ? '🟢' : '🔴'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-secondary text-sm leading-tight">{item.name}</p>
        {item.description && (
          <p className="text-xs text-secondary-light mt-0.5 line-clamp-2">{item.description}</p>
        )}
        {displayPrice && (
          <p className="text-sm font-bold text-gradient-primary mt-1">{displayPrice}</p>
        )}
      </div>
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
      )}
    </div>
  )
}
