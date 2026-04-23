import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
 import SignOutButton from '@/components/ui/SignOutButton'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">


        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
            <p className="text-zinc-400 text-sm">{user.email}</p>
            <SignOutButton />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <p className="text-zinc-400 text-sm">Plan</p>
            <p className="text-xl font-semibold mt-1 capitalize">{profile?.plan ?? 'Free'}</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <p className="text-zinc-400 text-sm">Credits</p>
            <p className="text-xl font-semibold mt-1">{profile?.credits ?? 0}</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <p className="text-zinc-400 text-sm">AI Influencers</p>
            <p className="text-xl font-semibold mt-1">0</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-zinc-600 transition text-left space-y-2">
            <p className="text-2xl">✨</p>
            <p className="font-semibold">Create AI Influencer</p>
            <p className="text-zinc-400 text-sm">Upload a photo to get started</p>
          </button>
          <button className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-zinc-600 transition text-left space-y-2">
            <p className="text-2xl">📸</p>
            <p className="font-semibold">Photo Templates</p>
            <p className="text-zinc-400 text-sm">Generate UGC photos in one click</p>
          </button>
          <button className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-zinc-600 transition text-left space-y-2">
            <p className="text-2xl">🎬</p>
            <p className="font-semibold">Video Clone</p>
            <p className="text-zinc-400 text-sm">Clone any viral video with your face</p>
          </button>
        </div>

      </div>
    </div>
  )
}