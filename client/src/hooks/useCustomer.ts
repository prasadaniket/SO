'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import type { Customer } from '@/types/customer'

export const useCustomer = (deviceId: string | null) => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!deviceId) return

    api.get<Customer>(`/customers/by-device/${deviceId}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => {
        if (err.response?.status !== 404) {
          setError('Failed to load customer data')
        }
        // 404 = new customer, that's fine
      })
      .finally(() => setLoading(false))
  }, [deviceId])

  return { customer, loading, error, setCustomer }
}
