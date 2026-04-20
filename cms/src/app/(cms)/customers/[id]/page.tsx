'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import Loader from '@/components/ui/Loader'
import ReviewCard from '@/components/cms/ReviewCard'
import { format } from 'date-fns'
import type { Customer } from '@/types/customer'
import type { Review } from '@/types/review'

export default function CustomerDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { loading: authLoading } = useAuth()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<Customer>(`/cms/customers/${id}`),
      api.get<{ content: Review[] }>(`/cms/reviews?customerId=${id}&size=20`),
    ])
      .then(([cRes, rRes]) => {
        setCustomer(cRes.data)
        setReviews(rRes.data.content)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (authLoading || loading) return <Loader fullScreen />
  if (!customer) return <div className="p-8 text-error">Customer not found.</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/customers" className="text-secondary-light hover:text-[#E88C3A] text-sm">
          ← Customers
        </Link>
        <h1 className="text-2xl font-bold text-secondary">{customer.fullName}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 grid grid-cols-2 gap-4 text-sm">
        <div><p className="text-secondary-light">Phone</p><p className="font-semibold text-secondary">{customer.phone}</p></div>
        <div><p className="text-secondary-light">Email</p><p className="font-semibold text-secondary">{customer.email || '—'}</p></div>
        <div><p className="text-secondary-light">Gender</p><p className="font-semibold text-secondary">{customer.gender}</p></div>
        <div><p className="text-secondary-light">Marital Status</p><p className="font-semibold text-secondary">{customer.maritalStatus}</p></div>
        <div><p className="text-secondary-light">Birthday</p><p className="font-semibold text-secondary">{format(new Date(customer.birthDate), 'dd MMM')}</p></div>
        {customer.anniversaryDate && (
          <div><p className="text-secondary-light">Anniversary</p><p className="font-semibold text-secondary">{format(new Date(customer.anniversaryDate), 'dd MMM')}</p></div>
        )}
        <div>
          <p className="text-secondary-light">Total Visits</p>
          <p className="font-bold text-gradient-primary text-lg">{customer.totalVisits}</p>
        </div>
        <div>
          <p className="text-secondary-light">Last Visit</p>
          <p className="font-semibold text-secondary">{customer.lastVisitDate ? format(new Date(customer.lastVisitDate), 'dd MMM yyyy') : '—'}</p>
        </div>
        <div><p className="text-secondary-light">Joined</p><p className="font-semibold text-secondary">{format(new Date(customer.createdAt), 'dd MMM yyyy')}</p></div>
      </div>

      {reviews.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-secondary mb-4">Reviews ({reviews.length})</h2>
          <div className="space-y-3">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      )}
    </div>
  )
}
