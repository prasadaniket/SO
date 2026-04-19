'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import Button from '@/components/ui/Button'

interface ExportButtonProps {
  outletId?: string
}

export default function ExportButton({ outletId }: ExportButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const params = outletId ? `?outletId=${outletId}` : ''
      const res = await api.get(`/cms/export/customers${params}`, { responseType: 'blob' })
      const url = URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.download = `customers-${Date.now()}.csv`
      link.click()
      URL.revokeObjectURL(url)
      toast.success('Export downloaded!')
    } catch {
      toast.error('Export failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleExport} disabled={loading}>
      {loading ? 'Exporting...' : '⬇ Export CSV'}
    </Button>
  )
}
