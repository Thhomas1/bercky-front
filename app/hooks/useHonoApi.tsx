'use client'

import { supabase } from "@/lib/supa";


export function useHonoApi() {

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