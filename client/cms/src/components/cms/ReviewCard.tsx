import type { Review } from '@/types/review'
import { format } from 'date-fns'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.stars)

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral-light/50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-secondary">{review.customerName}</p>
          <p className="text-xs text-secondary-light">{review.outletName}</p>
        </div>
        <div className="text-right">
          <div className="flex gap-0.5">
            {stars.map((filled, i) => (
              <span key={i} className={filled ? 'text-tertiary' : 'text-neutral-light'}>★</span>
            ))}
          </div>
          <p className="text-xs text-secondary-light mt-1">
            {format(new Date(review.createdAt), 'dd MMM yyyy')}
          </p>
        </div>
      </div>
      {review.reviewText && (
        <p className="text-sm text-secondary-light leading-relaxed">{review.reviewText}</p>
      )}
      <div className="mt-3 flex gap-2">
        <span className="text-xs bg-neutral-off-white text-secondary-light px-2 py-1 rounded-full capitalize">
          {review.reviewType.replace('_', ' ')}
        </span>
        {review.postedToGoogle && (
          <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">Google Posted</span>
        )}
      </div>
    </div>
  )
}
