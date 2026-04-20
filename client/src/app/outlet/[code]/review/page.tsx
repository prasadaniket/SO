'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useDeviceFingerprint } from '@/hooks/useDeviceFingerprint'
import { useCustomer } from '@/hooks/useCustomer'
import { useOutlet } from '@/hooks/useOutlet'
import ReviewForm from '@/components/form2/review'
import Loader from '@/components/ui/Loader'

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const code = params.code as string

  const { deviceId, loading: fpLoading } = useDeviceFingerprint()
  const { outlet, loading: outletLoading } = useOutlet(code)
  const { customer, loading: customerLoading } = useCustomer(deviceId)
  const [success, setSuccess] = useState(false)

  const loading = fpLoading || outletLoading || customerLoading

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1A1A] to-[#000000]">
      <Loader />
    </div>
  )

  if (!outlet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1A1A] to-[#000000] flex-col gap-4">
        <p className="text-white/50 text-lg">Unable to load outlet data.</p>
        <Link href={`/outlet/${code}`} className="text-[#E88C3A] underline underline-offset-4">Go Back</Link>
      </div>
    )
  }

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(() => {
      router.push(`/outlet/${code}`)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-8 px-4 bg-gradient-to-b from-[#1A1A1A] to-[#000000] overflow-x-hidden">
      <motion.div 
        className="fixed top-[-5%] left-1/2 w-[350px] h-[350px] bg-[#E88C3A] opacity-10 blur-[130px] rounded-full pointer-events-none"
        style={{ x: '-50%' }}
        animate={{ 
           scale: [1, 1.05, 1], 
           x: ['-50%', '-48%', '-52%', '-50%'],
           y: [0, 15, -10, 0] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <Link href={`/outlet/${code}`}>
            <motion.div 
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#E88C3A] hover:text-[#F2A65A] transition-colors p-2 -ml-2 rounded-full cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </motion.div>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-[0.5px]">Review</h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {success ? (
            <div className="bg-[#111111] rounded-[28px] border border-white/5 p-8 text-center shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-white/60 mb-6 font-medium">Your review has been successfully submitted.</p>
              <Loader />
            </div>
          ) : (
            <ReviewForm customer={customer} outlet={outlet} onSuccess={handleSuccess} />
          )}
        </motion.div>
      </main>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-auto relative z-10 w-full text-center pb-8 pt-8 text-white/30 text-[11px] tracking-wide font-medium"
      >
        © 2026 UniCord. All rights reserved.
      </motion.div>
    </div>
  )
}
