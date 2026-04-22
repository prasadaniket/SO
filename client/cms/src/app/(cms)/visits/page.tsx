'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import StatCard from '@/components/cms/StatCard'
import Loader from '@/components/ui/Loader'
import type { DashboardStats } from '@/types/api'

export default function VisitsPage() {
  const { user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<DashboardStats>('/cms/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (authLoading || loading) return <Loader fullScreen />

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Visit Analytics</h1>
        <p className="text-secondary-light text-sm mt-1">Track customer visit frequency</p>
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard title="Total Visits"  value={stats.totalVisits}                                            color="primary" />
            <StatCard title="Inactive"      value={stats.inactiveCustomers}                                      color="error"   subtitle="No visit in 30+ days" />
            <StatCard title="Active"        value={(stats.totalCustomers ?? 0) - (stats.inactiveCustomers ?? 0)} color="success" subtitle="Last 30 days" />
          </div>

          {user?.role === 'main_owner' && stats.outletStats && (
            <div>
              <h2 className="text-lg font-bold text-secondary mb-4">Visits by Outlet</h2>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-off-white border-b border-neutral-light">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Outlet</th>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Total Visits</th>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Customers</th>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Inactive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.outletStats.map((os) => (
                      <tr key={os.outletCode} className="border-b border-neutral-light/50">
                        <td className="px-4 py-3 font-medium text-secondary">{os.outletName}</td>
                        <td className="px-4 py-3 text-secondary-light">{os.visits}</td>
                        <td className="px-4 py-3 text-secondary-light">{os.customers}</td>
                        <td className="px-4 py-3">
                          <span className="bg-error/10 text-error text-xs font-bold px-2 py-1 rounded-full">
                            {os.inactiveCustomers}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
