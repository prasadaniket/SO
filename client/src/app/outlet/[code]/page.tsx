'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useDeviceFingerprint } from '@/hooks/useDeviceFingerprint'
import { useCustomer } from '@/hooks/useCustomer'
import { useOutlet } from '@/hooks/useOutlet'
import Footer from '@/components/layout/Footer'
import FirstVisitForm from '@/components/forms/FirstVisitForm'
import OngoingReviewForm from '@/components/forms/OngoingReviewForm'
import Loader from '@/components/ui/Loader'

export default function OutletPage() {
  const params = useParams()
  const code = params.code as string

  const { deviceId, loading: fpLoading } = useDeviceFingerprint()
  const { outlet, loading: outletLoading } = useOutlet(code)
  const { customer, loading: customerLoading, setCustomer } = useCustomer(deviceId)
  const [visitRecorded, setVisitRecorded] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!deviceId || !outlet || visitRecorded) return
    api.post('/visits', { deviceId, outletId: outlet.id, visitType: 'qr_scan' })
      .catch(console.error)
      .finally(() => setVisitRecorded(true))
  }, [deviceId, outlet, visitRecorded])

  const handleFormSuccess = () => {
    if (deviceId) {
      api.get(`/customers/by-device/${deviceId}`)
        .then((res) => setCustomer(res.data))
        .catch(console.error)
    }
    setRefreshKey((k) => k + 1)
  }

  const loading = fpLoading || outletLoading || customerLoading

  if (loading) return <Loader fullScreen />

  if (!outlet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">Outlet not found</p>
      </div>
    )
  }

  const showOngoingForm = customer && customer.hasSubmittedFirstReview

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full px-4 py-6 space-y-5">
        <div className="pt-2 pb-1">
          <h1 className="text-xl font-bold text-secondary">{outlet.name}</h1>
          <p className="text-sm text-secondary-light">{outlet.location}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm flex flex-wrap gap-4">
          {outlet.googleMapsUrl && (
            <a href={outlet.googleMapsUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              View on Maps
            </a>
          )}
          {outlet.instagramUrl && (
            <a href={outlet.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Instagram
            </a>
          )}
          {outlet.facebookUrl && (
            <a href={outlet.facebookUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Facebook
            </a>
          )}
        </div>

        <Link href={`/outlet/${code}/menu`}
          className="block bg-primary text-white rounded-xl p-5 shadow-sm hover:bg-primary-hover transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">View Our Menu</p>
              <p className="text-sm text-white/80 mt-0.5">Browse all dishes & prices</p>
            </div>
          </div>
        </Link>

        <div key={refreshKey}>
          {showOngoingForm ? (
            <OngoingReviewForm customer={customer} outlet={outlet} onSuccess={handleFormSuccess} />
          ) : (
            deviceId && <FirstVisitForm outlet={outlet} deviceId={deviceId} onSuccess={handleFormSuccess} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
