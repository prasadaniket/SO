interface StatCardProps {
  title: string
  value: number | string
  color?: 'primary' | 'warning' | 'success' | 'error' | 'info'
  subtitle?: string
}

const colorMap = {
  primary: 'border-l-[#E88C3A]',
  warning: 'border-l-warning',
  success: 'border-l-success',
  error: 'border-l-error',
  info: 'border-l-info',
}

export default function StatCard({ title, value, color = 'primary', subtitle }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-neutral-light/50 border-l-4 ${colorMap[color]}`}>
      <p className="text-xs text-secondary-light font-medium">{title}</p>
      <p className="text-2xl font-bold text-secondary mt-1">{value}</p>
      {subtitle && <p className="text-xs text-secondary-light mt-1">{subtitle}</p>}
    </div>
  )
}
