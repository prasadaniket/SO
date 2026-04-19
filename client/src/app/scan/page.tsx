'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import type { Outlet } from '@/types/outlet'
import Footer from '@/components/layout/Footer'
import Loader from '@/components/ui/Loader'

export default function ScanPage() {
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<Outlet[]>('/outlets')
      .then((res) => setOutlets(res.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-secondary">Welcome to Stone Oven!</h1>
          <p className="text-secondary-light mt-2">Select your outlet to continue</p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-3">
            {outlets.map((outlet) => (
              <Link
                key={outlet.id}
                href={`/outlet/${outlet.code}`}
                className="block bg-white rounded-xl p-5 shadow-sm border border-neutral-light/50 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-secondary text-lg group-hover:text-primary transition-colors">
                      {outlet.name}
                    </p>
                    <p className="text-secondary-light text-sm mt-0.5">{outlet.location}</p>
                  </div>
                  <span className="text-primary text-xl">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
