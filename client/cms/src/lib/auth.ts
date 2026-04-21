import type { LoginResponse } from '@/types/api'

const TOKEN_KEY = 'cms_token'
const USER_KEY = 'cms_user'

export const saveSession = (data: LoginResponse) => {
  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export const getUser = (): LoginResponse | null => {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const isAuthenticated = (): boolean => !!getToken()
