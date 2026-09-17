'use client'

import { createBrowserClient } from '@supabase/ssr'

export function useHonoApi() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      throw new Error('No hay una sesión activa en el frontend')
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${session.access_token}`,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      headers,
    })
    return response.json()
  }
  return { fetchWithAuth }
}