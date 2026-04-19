'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import type { MenuItem, MenuCategory } from '@/types/menu'
import Footer from '@/components/layout/Footer'
import MenuSearch from '@/components/menu/MenuSearch'
import MenuCategorySection from '@/components/menu/MenuCategorySection'
import Loader from '@/components/ui/Loader'

interface MenuGroup {
  category: MenuCategory
  items: MenuItem[]
}

export default function MenuPage() {
  const params = useParams()
  const code = params.code as string

  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [vegOnly, setVegOnly] = useState(false)

  useEffect(() => {
    api.get<MenuItem[]>(`/menu/outlet/${code}`)
      .then((res) => {
        const groups: Record<string, MenuGroup> = {}
        res.data.forEach((item) => {
          const catId = item.categoryId
          if (!groups[catId]) {
            groups[catId] = { category: item.category, items: [] }
          }
          groups[catId].items.push(item)
        })
        setMenuGroups(Object.values(groups))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [code])

  const filteredGroups = menuGroups.map((g) => ({
    ...g,
    items: g.items.filter((item) => {
      const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
      const matchesVeg = !vegOnly || item.isVeg
      return matchesSearch && matchesVeg
    }),
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full px-4 py-6">
        <div className="flex items-center gap-3 mb-5">
          <Link href={`/outlet/${code}`} className="text-secondary-light hover:text-primary text-sm">
            Back
          </Link>
          <h1 className="text-xl font-bold text-secondary">Our Menu</h1>
        </div>

        <div className="mb-5">
          <MenuSearch value={search} onChange={setSearch} vegOnly={vegOnly} onVegToggle={() => setVegOnly(!vegOnly)} />
        </div>

        {loading ? (
          <Loader />
        ) : (
          filteredGroups.map((g) => (
            <MenuCategorySection key={g.category.id} category={g.category} items={g.items} />
          ))
        )}
      </main>
      <Footer />
    </div>
  )
}
