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
    <div className="min-h-screen bg-[#080808] text-white">

      {/* top nav */}
      <nav className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9.5 5.5H12.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1.5 5.5H4.5L7 1Z" fill="white"/>
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-tight">AI Influencer</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500">{user.email}</span>
          <SignOutButton />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">

        {/* hero greeting */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/20 via-violet-900/10 to-transparent border border-violet-500/20 p-8">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-violet-400 text-sm font-medium mb-1 uppercase tracking-widest">Welcome back</p>
            <h1 className="text-3xl font-bold mb-1">Your AI Studio</h1>
            <p className="text-zinc-400 text-sm">Create content that goes viral. No camera needed.</p>
          </div>
          <div className="relative mt-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs px-3 py-1.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
              {profile?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
            </span>
            <span className="text-zinc-500 text-xs">{profile?.credits ?? 0} credits remaining</span>
          </div>
        </div>

        {/* stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'AI Influencers', value: '0', sub: 'characters created' },
            { label: 'Photos Generated', value: '0', sub: 'this month' },
            { label: 'Videos Cloned', value: '0', sub: 'this month' },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900/50 border border-white/5 rounded-xl p-5 hover:border-white/10 transition">
              <p className="text-zinc-500 text-xs mb-3 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-zinc-600 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* main actions */}
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Quick Actions</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* create influencer */}
            <button className="group relative overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-violet-500/50 rounded-2xl p-6 text-left transition-all duration-300 hover:bg-violet-950/20">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-violet-600/0 group-hover:from-violet-600/5 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="6" r="3.5" stroke="#a78bfa" strokeWidth="1.5"/>
                    <path d="M2 15.5C2 12.462 5.134 10 9 10s7 2.462 7 5.5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="font-semibold mb-1">Create AI Influencer</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Upload one photo. Get a consistent AI character for all your content.</p>
                <div className="mt-4 flex items-center gap-1 text-violet-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                  Get started
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>

            {/* photo templates */}
            <button className="group relative overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-pink-500/50 rounded-2xl p-6 text-left transition-all duration-300 hover:bg-pink-950/20">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/0 to-pink-600/0 group-hover:from-pink-600/5 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-4 group-hover:bg-pink-500/30 transition">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="4" width="14" height="11" rx="2" stroke="#f472b6" strokeWidth="1.5"/>
                    <circle cx="6.5" cy="8.5" r="1.5" stroke="#f472b6" strokeWidth="1.5"/>
                    <path d="M2 12l4-3 3 2.5 3-3 4 4" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold mb-1">Photo Templates</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Pick a vibe, click generate. iPhone selfie, GRWM, product hold — done.</p>
                <div className="mt-4 flex items-center gap-1 text-pink-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                  Browse templates
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>

            {/* video clone */}
            <button className="group relative overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-cyan-500/50 rounded-2xl p-6 text-left transition-all duration-300 hover:bg-cyan-950/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-cyan-600/0 group-hover:from-cyan-600/5 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 13.5v-9Z" stroke="#22d3ee" strokeWidth="1.5"/>
                    <path d="M7.5 6.5l4 2.5-4 2.5V6.5Z" fill="#22d3ee"/>
                  </svg>
                </div>
                <p className="font-semibold mb-1">Video Clone</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Drop any viral TikTok. Your AI influencer takes over the video instantly.</p>
                <div className="mt-4 flex items-center gap-1 text-cyan-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                  Clone a video
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>

          </div>
        </div>

        {/* recent jobs placeholder */}
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Recent Jobs</p>
          <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v6l4 2" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="10" cy="10" r="7.5" stroke="#52525b" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="text-zinc-500 text-sm">No jobs yet</p>
            <p className="text-zinc-700 text-xs mt-1">Your generated content will appear here</p>
          </div>
        </div>

      </div>
    </div>
  )
}