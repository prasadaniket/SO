'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import CustomerTable from '@/components/cms/CustomerTable'
import ExportButton from '@/components/cms/ExportButton'
import Loader from '@/components/ui/Loader'
import type { Customer } from '@/types/customer'
import type { PageResponse } from '@/types/api'

export default function CustomersPage() {
  const { user, loading: authLoading } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const outletParam = user?.assignedOutletId ? `&outletId=${user.assignedOutletId}` : ''
    api.get<PageResponse<Customer>>(`/cms/customers?page=${page}&size=20${outletParam}`)
      .then((res) => {
        setCustomers(res.data.content)
        setTotalPages(res.data.totalPages)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page, user?.assignedOutletId])

  if (authLoading || loading) return <Loader fullScreen />

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Customers</h1>
          <p className="text-secondary-light text-sm mt-1">All registered customers</p>
        </div>
        <ExportButton outletId={user?.assignedOutletId ?? undefined} />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <CustomerTable customers={customers} />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm border border-neutral-light rounded-lg disabled:opacity-40 hover:border-primary transition-colors"
          >
            ← Prev
          </button>
          <span className="px-4 py-2 text-sm text-secondary-light">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-4 py-2 text-sm border border-neutral-light rounded-lg disabled:opacity-40 hover:border-primary transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
