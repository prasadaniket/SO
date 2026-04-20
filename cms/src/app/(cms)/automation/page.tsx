'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import type { PageResponse } from '@/types/api'

interface AutomationLog {
  id: string
  customer: { fullName: string; phone: string }
  automationType: string
  messageStage: string
  status: 'success' | 'failed'
  sentAt: string
  errorMessage: string | null
}

const typeLabel: Record<string, string> = {
  birthday_whatsapp: 'Birthday WhatsApp',
  birthday_email: 'Birthday Email',
  anniversary_whatsapp: 'Anniversary WhatsApp',
  anniversary_email: 'Anniversary Email',
  reengagement_whatsapp: 'Re-engagement WhatsApp',
  reengagement_email: 'Re-engagement Email',
}

const stageLabel: Record<string, string> = {
  five_days_before: '5 days before',
  one_day_before: '1 day before',
  thirty_days_inactive: '30 days inactive',
}

export default function AutomationPage() {
  const { user, loading: authLoading } = useAuth()
  const [logs, setLogs] = useState<AutomationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [triggering, setTriggering] = useState(false)

  useEffect(() => {
    api.get<PageResponse<AutomationLog>>('/cms/automation-logs?page=0&size=50')
      .then((res) => setLogs(res.data.content))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const triggerReengagement = async () => {
    setTriggering(true)
    try {
      await api.post('/cms/reengagement/trigger')
      toast.success('Re-engagement campaign triggered!')
    } catch {
      toast.error('Failed to trigger campaign')
    } finally {
      setTriggering(false)
    }
  }

  if (authLoading || loading) return <Loader fullScreen />

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Automation</h1>
          <p className="text-secondary-light text-sm mt-1">Birthday, anniversary & re-engagement logs</p>
        </div>
        {user?.role === 'main_owner' && (
          <Button onClick={triggerReengagement} disabled={triggering} variant="secondary">
            {triggering ? 'Triggering...' : 'Trigger Re-engagement'}
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {logs.length === 0 ? (
          <div className="text-center py-12 text-secondary-light">No automation logs yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-neutral-off-white border-b border-neutral-light">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-secondary">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary">Stage</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-neutral-light/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-secondary">{log.customer?.fullName}</p>
                    <p className="text-xs text-secondary-light">{log.customer?.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary-light">{typeLabel[log.automationType] || log.automationType}</td>
                  <td className="px-4 py-3 text-secondary-light text-xs">{stageLabel[log.messageStage] || log.messageStage}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      log.status === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-secondary-light text-xs">
                    {format(new Date(log.sentAt), 'dd MMM yy, HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
