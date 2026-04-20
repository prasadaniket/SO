'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import { saveSession } from '@/lib/auth'
import { loginSchema, type LoginFormData } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { LoginResponse } from '@/types/api'

export default function CmsLoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const res = await api.post<LoginResponse>('/auth/login', data)
      saveSession(res.data)
      toast.success(`Welcome, ${res.data.fullName}!`)
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary">StoneOven</h1>
          <p className="text-neutral-light text-sm mt-1">CMS Portal</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-secondary mb-6">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Email" type="email" {...register('email')} error={errors.email?.message} placeholder="your@email.com" />
            <Input label="Password" type="password" {...register('password')} error={errors.password?.message} placeholder="••••••••" />
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className="text-center text-neutral-medium text-xs mt-6">
          StoneOven CMS · Powered by UniCord
        </p>
      </div>
    </div>
  )
}
