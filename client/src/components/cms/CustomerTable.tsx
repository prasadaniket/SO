import type { Customer } from '@/types/customer'
import { format } from 'date-fns'

interface CustomerTableProps {
  customers: Customer[]
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  if (customers.length === 0) {
    return <div className="text-center py-12 text-secondary-light">No customers found.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-off-white border-b border-neutral-light">
            <th className="text-left px-4 py-3 font-semibold text-secondary">Name</th>
            <th className="text-left px-4 py-3 font-semibold text-secondary">Phone</th>
            <th className="text-left px-4 py-3 font-semibold text-secondary">Visits</th>
            <th className="text-left px-4 py-3 font-semibold text-secondary">Last Visit</th>
            <th className="text-left px-4 py-3 font-semibold text-secondary">Joined</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b border-neutral-light/50 hover:bg-neutral-off-white/50 transition-colors">
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-secondary">{c.fullName}</p>
                  {c.email && <p className="text-xs text-secondary-light">{c.email}</p>}
                </div>
              </td>
              <td className="px-4 py-3 text-secondary-light">{c.phone}</td>
              <td className="px-4 py-3">
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                  {c.totalVisits}
                </span>
              </td>
              <td className="px-4 py-3 text-secondary-light">
                {c.lastVisitDate ? format(new Date(c.lastVisitDate), 'dd MMM yyyy') : '—'}
              </td>
              <td className="px-4 py-3 text-secondary-light">
                {format(new Date(c.createdAt), 'dd MMM yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
