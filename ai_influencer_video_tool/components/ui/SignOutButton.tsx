'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-zinc-400 hover:text-white text-sm border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition"
    >
      Sign Out
    </button>
  )
}