import type { MenuItem, MenuCategory } from '@/types/menu'
import MenuItemCard from './MenuItemCard'

interface MenuCategorySectionProps {
  category: MenuCategory
  items: MenuItem[]
}

export default function MenuCategorySection({ category, items }: MenuCategorySectionProps) {
  if (items.length === 0) return null

  return (
    <div className="mb-6">
      <div className="bg-primary/10 px-4 py-2 rounded-lg mb-2">
        <h3 className="font-bold text-primary text-base">{category.name}</h3>
        <p className="text-xs text-secondary-light">{items.length} items</p>
      </div>
      <div className="bg-white rounded-xl px-4 shadow-sm">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
