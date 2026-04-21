"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Loader from '@/components/ui/Loader'
import { getSocialByOutlet } from '@/components/social/socialpage'
import { api } from '@/lib/api'
import type { Outlet } from '@/types/outlet'

export default function HomePage() {
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    api.get<Outlet[]>('/outlets')
      .then((res) => setOutlets(res.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-20 px-6 bg-gradient-to-b from-[#1A1A1A] to-[#000000] overflow-hidden">
      
      {/* Radial soft glow behind logo area - Animated */}
      <motion.div 
        className="absolute top-[8%] left-1/2 w-[350px] h-[350px] bg-[#E88C3A] opacity-15 blur-[120px] rounded-full pointer-events-none"
        style={{ x: '-50%' }}
        animate={{ 
           scale: [1, 1.05, 1], 
           x: ['-50%', '-48%', '-52%', '-50%'],
           y: [0, 10, -5, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main className="relative z-10 flex-1 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col items-center">

        {/* LOGO AREA */}
        <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full shadow-[0_15px_35px_rgba(232,140,58,0.25)] ring-1 ring-white/10 mb-5 relative group"
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_25px_rgba(232,140,58,0.4)] transition-opacity duration-300 pointer-events-none" />
            <Avatar className="w-24 h-24 bg-[#1A1A1A]">
              <AvatarImage src="/images/logo/logo.jpg" alt="StoneOven" className="object-cover" />
              <AvatarFallback className="text-white text-2xl font-bold bg-[#1A1A1A]">SO</AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>

        {/* TYPOGRAPHY */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="font-extrabold text-2xl mb-1 text-center tracking-[0.5px]"
        >
          <span className="text-white">STONE</span>
          <motion.span
            animate={{ textShadow: ['0 0 4px rgba(232,140,58,0.1)', '0 0 12px rgba(232,140,58,0.4)', '0 0 4px rgba(232,140,58,0.1)'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(to right, #F2A65A, #E88C3A, #D96A1D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >OVEN</motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-white/70 text-[13px] mb-10 text-center font-medium"
        >
          Authentic flavours, crafted with love
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-white/50 text-[10px] font-medium uppercase tracking-[0.4em] mb-4 w-full text-center"
        >
          Select Outlet
        </motion.p>

        {/* OUTLET LIST */}
        {loading ? (
          <div className="flex justify-center py-4 w-full mb-10">
            <Loader />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 mb-10">
            {outlets.map((outlet, index) => {
              const isSelected = selectedId === outlet.id
              const isOtherSelected = selectedId !== null && selectedId !== outlet.id

              return (
                <motion.div
                  key={outlet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.08, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link href={`/${(outlet.slug ?? outlet.name.split(' ').pop()!).toLowerCase()}`} onClick={() => setSelectedId(outlet.id)}>
                    <motion.div
                      whileHover={!isSelected ? { y: -3, scale: 1.02 } : { scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      animate={
                        isOtherSelected
                          ? { opacity: 0.8, filter: 'blur(1px)' }
                          : { opacity: 1, filter: 'blur(0px)' }
                      }
                      className={`
                        relative overflow-hidden w-full h-[60px] flex items-center justify-center rounded-full transition-colors duration-300
                        ${isSelected
                          ? 'bg-gradient-to-b from-[#F2A65A] via-[#E88C3A] to-[#D96A1D] shadow-[0_0_16px_rgba(232,140,58,0.3)] border border-white/10'
                          : 'bg-[#EEEEEE] shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-transparent'
                        }
                      `}
                    >
                      <span className={`relative z-10 font-semibold text-[15px] tracking-wide transition-colors duration-300 ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        {outlet.name}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* SOCIAL ICONS */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-7 mt-auto"
        >
          {getSocialByOutlet('India').map((link) => (
            <motion.a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ scale: 1.15, textShadow: '0 0 10px rgba(232,140,58,0.5)' }}
              whileTap={{ scale: 0.9 }}
              className="text-white/50 hover:text-[#E88C3A] transition-colors duration-200"
            >
              {link.platform === 'instagram' && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              )}
              {link.platform === 'facebook' && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
            </motion.a>
          ))}
        </motion.div>

      </main>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 w-full text-center pb-8 pt-6 text-white/30 text-[11px] tracking-wide font-medium"
      >
        © 2026 UniCord. All rights reserved.
      </motion.div>
    </div>
  )
}
