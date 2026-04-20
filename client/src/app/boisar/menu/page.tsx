'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { boisarMenuData, type BoisarMenuItem } from '@/components/menu/boisarmenu'

function getVariants(type: string): string[] {
  return type.split('/')
}

function hasVegOption(type: string): boolean {
  return getVariants(type).includes('veg')
}

function formatPrice(prices: number[], type: string): { label: string; price: string }[] {
  const variants = getVariants(type)
  const labelMap: Record<string, string> = { veg: 'Veg', nonVeg: 'Non-Veg', seafood: 'Seafood' }

  if (prices.length === 1) {
    return [{ label: '', price: `₹${prices[0]}` }]
  }

  if (variants.length === prices.length && variants.length > 1) {
    return variants.map((v, i) => ({ label: labelMap[v] ?? v, price: `₹${prices[i]}` }))
  }

  return [{ label: '', price: prices.map((p) => `₹${p}`).join(' / ') }]
}

function TypeDot({ type }: { type: string }) {
  const variants = getVariants(type)
  return (
    <div className="flex gap-[3px] flex-shrink-0 mt-[3px]">
      {variants.map((v) => (
        <div
          key={v}
          className={`w-[10px] h-[10px] rounded-sm border ${
            v === 'veg'
              ? 'bg-green-500 border-green-600'
              : v === 'seafood'
              ? 'bg-blue-400 border-blue-500'
              : 'bg-red-500 border-red-600'
          }`}
        />
      ))}
    </div>
  )
}

function PriceBlock({ prices, type }: { prices: number[]; type: string }) {
  const parts = formatPrice(prices, type)

  if (parts.length === 1) {
    return <span className="text-[#F2A65A] font-bold text-[13.5px]">{parts[0].price}</span>
  }

  if (parts[0].label) {
    return (
      <div className="flex flex-col items-end gap-[2px]">
        {parts.map(({ label, price }) => (
          <span key={label} className="text-[11.5px] font-medium leading-snug">
            <span className="text-white/35">{label} </span>
            <span className="text-[#F2A65A] font-bold">{price}</span>
          </span>
        ))}
      </div>
    )
  }

  return <span className="text-[#F2A65A] font-bold text-[13px]">{parts[0].price}</span>
}

function ItemRow({ item, last }: { item: BoisarMenuItem; last: boolean }) {
  return (
    <div className={`px-4 py-3.5 ${!last ? 'border-b border-white/[0.05]' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <TypeDot type={item.type} />
            <div className="min-w-0">
              <p className="font-semibold text-white/90 text-[13.5px] leading-snug">{item.name}</p>
              {item.options && (
                <p className="text-[11px] text-white/30 mt-0.5 leading-snug">
                  {item.options.join(' · ')}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 text-right pt-[1px]">
          <PriceBlock prices={item.prices} type={item.type} />
        </div>
      </div>
    </div>
  )
}

export default function BoisarMenuPage() {
  const [vegOnly, setVegOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(boisarMenuData[0].category)

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const headerRef = useRef<HTMLDivElement>(null)
  const observingRef = useRef(true)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    boisarMenuData.forEach(({ category }) => {
      const el = sectionRefs.current[category]
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && observingRef.current) {
            setActiveCategory(category)
          }
        },
        { rootMargin: '-15% 0px -65% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    tabRefs.current[activeCategory]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeCategory])

  const scrollToCategory = useCallback((category: string) => {
    observingRef.current = false
    setActiveCategory(category)
    const el = sectionRefs.current[category]
    if (el) {
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setTimeout(() => { observingRef.current = true }, 900)
  }, [])

  const filteredData = boisarMenuData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const matchVeg = !vegOnly || hasVegOption(item.type)
        const matchSearch =
          !search || item.name.toLowerCase().includes(search.toLowerCase())
        return matchVeg && matchSearch
      }),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#1A1A1A] to-[#000000]">
      <motion.div
        className="fixed top-0 left-1/2 w-[420px] h-[420px] bg-[#E88C3A] opacity-[0.07] blur-[150px] rounded-full pointer-events-none z-0"
        style={{ x: '-50%' }}
        animate={{ scale: [1, 1.06, 1], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sticky header */}
      <div ref={headerRef} className="sticky top-0 z-30 bg-[#0f0f0f]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-xl mx-auto px-4 pt-4 pb-2">

          {/* Title row */}
          <div className="flex items-center gap-3 mb-3">
            <Link href="/boisar">
              <motion.div
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.88 }}
                className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center text-[#E88C3A] flex-shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </motion.div>
            </Link>

            <div className="flex-1 min-w-0">
              <h1 className="text-[17px] font-extrabold tracking-tight leading-none">
                <span className="text-white">STONE</span>
                <motion.span
                  animate={{ textShadow: ['0 0 4px rgba(232,140,58,0.0)', '0 0 10px rgba(232,140,58,0.5)', '0 0 4px rgba(232,140,58,0.0)'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: 'linear-gradient(to right, #F2A65A, #E88C3A)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  OVEN
                </motion.span>
              </h1>
              <p className="text-[11px] text-white/35 font-medium mt-0.5">Boisar · Full Menu</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setVegOnly((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-200 flex-shrink-0 ${
                vegOnly
                  ? 'bg-green-500/15 border-green-500/40 text-green-400'
                  : 'bg-white/[0.05] border-white/[0.08] text-white/40'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-sm border transition-colors duration-200 ${
                  vegOnly ? 'bg-green-500 border-green-600' : 'bg-white/15 border-white/20'
                }`}
              />
              Veg
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 flex-shrink-0"
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes…"
              className="w-full pl-9 pr-9 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white/85 text-[13.5px] placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#E88C3A]/35 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {boisarMenuData.map(({ category }) => (
              <button
                key={category}
                ref={(el) => { tabRefs.current[category] = el }}
                onClick={() => scrollToCategory(category)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#F2A65A] to-[#E88C3A] text-white shadow-[0_2px_10px_rgba(232,140,58,0.3)]'
                    : 'bg-white/[0.05] text-white/40 hover:text-white/65 border border-white/[0.06]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <main className="relative z-10 flex-1 max-w-xl mx-auto w-full px-4 pt-5 pb-16">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-white/30 text-sm font-medium">No dishes found</p>
            <p className="text-white/15 text-[12px] mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredData.map(({ category, items }) => (
              <div
                key={category}
                ref={(el) => { sectionRefs.current[category] = el }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-2.5 px-1">
                  <h2 className="text-white font-extrabold text-[14px] tracking-tight flex-shrink-0">
                    {category}
                  </h2>
                  <div className="flex-1 h-px bg-white/[0.07]" />
                  <span className="text-[11px] text-white/25 font-medium flex-shrink-0">
                    {items.length}
                  </span>
                </div>

                {/* Items card */}
                <div className="rounded-2xl bg-white/[0.035] border border-white/[0.06] overflow-hidden">
                  {items.map((item, idx) => (
                    <ItemRow key={item.id} item={item} last={idx === items.length - 1} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="relative z-10 text-center pb-8 text-[10px] text-white/20 tracking-wider font-medium">
        © 2026 UniCord. All rights reserved.
      </div>
    </div>
  )
}
