'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import { copyToClipboard } from '@/lib/clipboard'
import { firstVisitFormSchema, type FirstVisitFormData } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import StarRating from '@/components/ui/StarRating'
import Modal from '@/components/ui/Modal'
import type { Outlet } from '@/types/outlet'

interface Props {
  outlet: Outlet
  deviceId: string
  onSuccess: () => void
}

export default function FirstVisitForm({ outlet, deviceId, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [showGooglePopup, setShowGooglePopup] = useState(false)
  const [stars, setStars] = useState(0)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FirstVisitFormData>({
    resolver: zodResolver(firstVisitFormSchema),
  })

  const maritalStatus = watch('maritalStatus')

  const onSubmit = async (data: FirstVisitFormData) => {
    setSubmitting(true)
    try {
      const customerRes = await api.post('/customers', {
        deviceId,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        birthDate: data.birthDate,
        anniversaryDate: data.anniversaryDate || null,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        firstVisitOutletId: outlet.id,
      })

      await api.post('/reviews', {
        customerId: customerRes.data.id,
        outletId: outlet.id,
        stars: data.stars,
        reviewText: data.reviewText || '',
        reviewType: 'first_visit',
      })

      if (data.reviewText) {
        await copyToClipboard(data.reviewText)
        toast.success('Review copied to clipboard!')
      }

      setShowGooglePopup(true)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.')
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
    onSuccess()
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-secondary mb-1">Share Your Experience</h2>
        <p className="text-sm text-secondary-light mb-6">First visit? Tell us about yourself!</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name *" {...register('fullName')} error={errors.fullName?.message} placeholder="Your full name" />
          <Input label="Phone Number *" type="tel" {...register('phone')} error={errors.phone?.message} placeholder="10-digit mobile number" />
          <Input label="Email (Optional)" type="email" {...register('email')} error={errors.email?.message} placeholder="your@email.com" />

          <DatePicker label="Date of Birth *" {...register('birthDate')} error={errors.birthDate?.message} />

          <Select
            label="Marital Status *"
            {...register('maritalStatus')}
            error={errors.maritalStatus?.message}
            placeholder="Select status"
            options={[
              { value: 'Married', label: 'Married' },
              { value: 'Unmarried', label: 'Unmarried' },
            ]}
          />

          {maritalStatus === 'Married' && (
            <DatePicker label="Anniversary Date *" {...register('anniversaryDate')} error={errors.anniversaryDate?.message} />
          )}

          <Select
            label="Gender *"
            {...register('gender')}
            error={errors.gender?.message}
            placeholder="Select gender"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Transgender', label: 'Transgender' },
              { value: 'RatherNotSay', label: 'Rather not say' },
            ]}
          />

          <StarRating
            label="Rate Your Experience *"
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
              placeholder="Share your dining experience..."
            />
            {errors.reviewText && <p className="mt-1 text-sm text-error">{errors.reviewText.message}</p>}
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>

      <Modal isOpen={showGooglePopup} onClose={() => { setShowGooglePopup(false); onSuccess() }}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-secondary mb-2">Thank you!</h3>
          <p className="text-secondary-light text-sm mb-4">
            Your review has been copied to clipboard. Help us grow by posting it on Google!
          </p>
          <Button onClick={handleGoogleReview} className="w-full mb-3">
            Open Google Reviews
          </Button>
          <button onClick={() => { setShowGooglePopup(false); onSuccess() }} className="text-sm text-secondary-light hover:text-secondary">
            Skip for now
          </button>
        </div>
      </Modal>
    </>
  )
}
