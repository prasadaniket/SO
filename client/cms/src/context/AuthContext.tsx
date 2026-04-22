'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, clearSession, isAuthenticated } from '@/lib/auth'
import type { LoginResponse } from '@/types/api'

interface AuthContextValue {
  user: LoginResponse | null
  loading: boolean
  logout: () => void
  isOwner: boolean
  isFranchise: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser())
    }
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        isOwner: user?.role === 'main_owner',
        isFranchise: user?.role === 'franchise_owner',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
