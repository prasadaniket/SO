'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { copyToClipboard } from '@/lib/clipboard'
import { ongoingReviewSchema, type OngoingReviewData } from '@/lib/validators'
import Modal from '@/components/ui/Modal'
import type { Customer } from '@/types/customer'
import type { Outlet } from '@/types/outlet'

interface Props {
  customer?: Customer | null
  outlet: Outlet
  onSuccess?: () => void
}

export default function ReviewForm({ customer, outlet, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [showGooglePopup, setShowGooglePopup] = useState(false)
  const [stars, setStars] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<OngoingReviewData>({
    resolver: zodResolver(ongoingReviewSchema),
  })

  const onSubmit = async (data: OngoingReviewData) => {
    setSubmitting(true)
    try {
      await api.post('/reviews', {
        customerId: customer?.id || null,
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
      <div className="bg-[#111111] rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.5)] p-6 md:p-8 border border-white/5 relative overflow-hidden">
        
        {/* Subtle internal gradient/glow for premium depth */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

        {customer && customer.fullName ? (
          <div className="relative z-10 text-center mb-8">
            <h2 className="text-[20px] font-bold text-white mb-1 tracking-wide">
              Welcome back, {customer.fullName?.split(' ')[0]}!
            </h2>
            <p className="text-[13px] text-white/50 font-medium">
              Visit #{customer.totalVisits || 1} · {outlet.name}
            </p>
          </div>
        ) : (
          <div className="relative z-10 text-center mb-8">
            <h2 className="text-[20px] font-bold text-white mb-1 tracking-wide">
              Share Your Experience
            </h2>
            <p className="text-[13px] text-white/50 font-medium">
              Leave a review for {outlet.name}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
          
          {/* STAR RATING */}
          <div className="flex flex-col items-center">
            <p className="text-[14px] font-medium text-white/80 mb-3">How was your visit today? <span className="text-[#E88C3A]">*</span></p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setStars(star); setValue('stars', star) }}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="relative p-1 focus:outline-none"
                >
                  <svg 
                    className={`w-9 h-9 transition-colors duration-200 ${
                      (hoveredStar || stars) >= star 
                        ? 'text-[#F2A65A] drop-shadow-[0_0_8px_rgba(232,140,58,0.5)]' 
                        : 'text-white/20'
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </motion.button>
              ))}
            </div>
            {errors.stars && <p className="mt-2 text-[12px] text-red-400">{errors.stars.message}</p>}
          </div>

          {/* REVIEW INPUT */}
          <div className="pt-2">
            <label className="block text-[13px] font-medium text-white/70 mb-2 ml-1">Share Your Experience <span className="text-white/30">(Optional)</span></label>
            <textarea
              {...register('reviewText')}
              rows={4}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-[16px] p-4 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#E88C3A] focus:ring-1 focus:ring-[#E88C3A]/50 transition-all resize-none shadow-inner"
              placeholder="Share your experience today..."
            />
            {errors.reviewText && <p className="mt-1 ml-1 text-[12px] text-red-400">{errors.reviewText.message}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-b from-[#F2A65A] via-[#E88C3A] to-[#D96A1D] text-white font-bold text-[16px] py-4 rounded-[16px] shadow-[0_8px_20px_rgba(232,140,58,0.2)] hover:shadow-[0_12px_28px_rgba(232,140,58,0.35)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </motion.button>

        </form>
      </div>

      <Modal isOpen={showGooglePopup} onClose={() => { setShowGooglePopup(false); onSuccess?.() }}>
        <div className="text-center p-2">
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Thank you! 🎉</h3>
          <p className="text-[#1A1A1A]/70 text-[14px] mb-6 leading-relaxed">
            Your feedback means a lot to us! Help others discover <strong className="text-[#E88C3A]">StoneOven</strong> by posting on Google Reviews.
          </p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleReview} 
            className="w-full bg-gradient-to-b from-[#F2A65A] to-[#D96A1D] text-white font-bold py-3.5 rounded-[16px] shadow-[0_8px_20px_rgba(232,140,58,0.3)] mb-4"
          >
            Open Google Reviews
          </motion.button>
          <button onClick={() => { setShowGooglePopup(false); onSuccess?.() }} className="text-[13px] font-medium text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors underline underline-offset-4">
            Skip for now
          </button>
        </div>
      </Modal>
    </>
  )
}
