'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import { copyToClipboard } from '@/lib/clipboard'
import { ongoingReviewSchema, type OngoingReviewData } from '@/lib/validators'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import Modal from '@/components/ui/Modal'
import type { Customer } from '@/types/customer'
import type { Outlet } from '@/types/outlet'

interface Props {
  customer: Customer
  outlet: Outlet
  onSuccess?: () => void
}

export default function OngoingReviewForm({ customer, outlet, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [showGooglePopup, setShowGooglePopup] = useState(false)
  const [stars, setStars] = useState(0)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<OngoingReviewData>({
    resolver: zodResolver(ongoingReviewSchema),
  })

  const onSubmit = async (data: OngoingReviewData) => {
    setSubmitting(true)
    try {
      await api.post('/reviews', {
        customerId: customer.id,
        outletId: outlet.id,
        stars: data.stars,
        reviewText: data.reviewText || '',
        reviewType: 'repeat',
      })

      if (data.reviewText) {
        await copyToClipboard(data.reviewText)
        toast.success('Review copied to clipboard!')
      }

      setShowGooglePopup(true)
    } catch {
      toast.error('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleReview = () => {
    window.open(
      `https://search.google.com/local/writereview?placeid=${outlet.googlePlaceId}`,
      '_blank'
    )
    setShowGooglePopup(false)
    onSuccess?.()
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-secondary mb-1">Welcome back, {customer.fullName}!</h2>
        <p className="text-sm text-secondary-light mb-2">
          Visit #{customer.totalVisits} · {outlet.name}
        </p>
        <div className="text-xs text-neutral-medium mb-6">
          {customer.phone}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <StarRating
            label="How was your visit today? *"
            value={stars}
            onChange={(s) => { setStars(s); setValue('stars', s) }}
            error={errors.stars?.message}
          />

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">Write a Review (Optional)</label>
            <textarea
              {...register('reviewText')}
              rows={4}
              className="w-full px-4 py-2.5 border border-neutral-light rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Share your experience today..."
            />
            {errors.reviewText && <p className="mt-1 text-sm text-error">{errors.reviewText.message}</p>}
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </div>

      <Modal isOpen={showGooglePopup} onClose={() => { setShowGooglePopup(false); onSuccess?.() }}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-secondary mb-2">Thank you!</h3>
          <p className="text-secondary-light text-sm mb-4">
            Your feedback means a lot to us! Help others discover StoneOven by posting on Google Reviews.
          </p>
          <Button onClick={handleGoogleReview} className="w-full mb-3">
            Open Google Reviews
          </Button>
          <button onClick={() => { setShowGooglePopup(false); onSuccess?.() }} className="text-sm text-secondary-light hover:text-secondary">
            Skip for now
          </button>
        </div>
      </Modal>
    </>
  )
}
