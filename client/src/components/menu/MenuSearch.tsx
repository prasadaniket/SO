'use client'

import Input from '@/components/ui/Input'

interface MenuSearchProps {
  value: string
  onChange: (v: string) => void
  vegOnly: boolean
  onVegToggle: () => void
}

export default function MenuSearch({ value, onChange, vegOnly, onVegToggle }: MenuSearchProps) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex-1">
        <Input
          placeholder="Search dishes..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button
        onClick={onVegToggle}
        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border-2 text-sm font-medium whitespace-nowrap transition-colors ${
          vegOnly
            ? 'border-success bg-success text-white'
            : 'border-neutral-light text-secondary-light hover:border-success hover:text-success'
        }`}
      >
        <span className="text-base">🟢</span>
        Veg Only
      </button>
    </div>
  )
}
