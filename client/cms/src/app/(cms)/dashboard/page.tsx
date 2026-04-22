'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import StatCard from '@/components/cms/StatCard'
import ExportButton from '@/components/cms/ExportButton'
import Loader from '@/components/ui/Loader'
import MainOwnerHome from '@/components/home/owner/page'
import FranchiseOwnerHome from '@/components/home/franchise/page'
import type { DashboardStats } from '@/types/api'

export default function DashboardPage() {
  const { user, loading: authLoading, isOwner } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    api.get<DashboardStats>('/cms/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (authLoading || loading) return <Loader fullScreen />

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">

      {/* Role-based header home section */}
      {isOwner ? <MainOwnerHome /> : <FranchiseOwnerHome />}

      {/* Stats — shared between both roles */}
      {stats && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-secondary">
              {isOwner ? 'All Outlets' : user?.assignedOutletName}
            </h2>
            <ExportButton outletId={user?.assignedOutletId ?? undefined} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard title="Total Customers"   value={stats.totalCustomers}        color="primary" />
            <StatCard title="Total Reviews"     value={stats.totalReviews}          color="warning"
              subtitle={stats.averageRating ? `Avg: ${stats.averageRating.toFixed(1)}` : undefined} />
            <StatCard title="Total Visits"      value={stats.totalVisits}           color="success" />
            <StatCard title="Inactive (30d)"    value={stats.inactiveCustomers}     color="error" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard title="New This Week"     value={stats.newCustomersThisWeek}  color="info" subtitle="Customers" />
            <StatCard title="Reviews This Week" value={stats.newReviewsThisWeek}    color="info" />
            <StatCard title="Birthdays"         value={stats.birthdaysThisMonth}    color="warning" />
            <StatCard title="Anniversaries"     value={stats.anniversariesThisMonth} color="primary" />
          </div>

          {/* Outlet breakdown — main_owner only */}
          {isOwner && stats.outletStats && (
            <div>
              <h2 className="text-lg font-bold text-secondary mb-3">Outlet Performance</h2>
              <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-off-white border-b border-neutral-light">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Outlet</th>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Customers</th>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Reviews</th>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Visits</th>
                      <th className="text-left px-4 py-3 font-semibold text-secondary">Avg Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.outletStats.map((os) => (
                      <tr key={os.outletCode} className="border-b border-neutral-light/50 last:border-0">
                        <td className="px-4 py-3 font-medium text-secondary">{os.outletName}</td>
                        <td className="px-4 py-3 text-secondary-light">{os.customers}</td>
                        <td className="px-4 py-3 text-secondary-light">{os.reviews}</td>
                        <td className="px-4 py-3 text-secondary-light">{os.visits}</td>
                        <td className="px-4 py-3 text-tertiary font-bold">
                          {os.avgRating ? `${os.avgRating.toFixed(1)} ★` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
