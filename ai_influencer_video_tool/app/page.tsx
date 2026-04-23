import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .syne { font-family: 'Syne', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatDelay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .float { animation: float 5s ease-in-out infinite; }
        .float-delay { animation: floatDelay 6s ease-in-out infinite 1s; }
        .float-delay-2 { animation: floatDelay 7s ease-in-out infinite 2s; }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s forwards; opacity: 0; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.7s ease 0.35s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.7s ease 0.5s forwards; opacity: 0; }
        .ticker { animation: scroll-left 22s linear infinite; }
        .glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .noise::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.35;
        }
        .card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px -10px rgba(0,0,0,0.5);
        }
      `}</style>

      <div className="noise min-h-screen bg-[#060606] text-white overflow-x-hidden">

        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5 bg-[#060606]/80 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7c3aed] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L4 6h3L3.5 12.5l7-7H7l2.5-4z" fill="white" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="syne font-bold text-lg tracking-tight">Viramaxx</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how" className="hover:text-white transition">How it works</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition hidden md:block">Sign in</Link>
            <Link href="/login" className="text-sm bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-medium transition">
              Get started free
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative pt-36 pb-20 px-6 md:px-10 flex flex-col items-center text-center overflow-hidden">

          {/* bg glows */}
          <div className="glow-pulse absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#7c3aed]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-60 left-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-[250px] h-[250px] bg-amber-500/6 rounded-full blur-[80px] pointer-events-none" />

          {/* badge */}
          <div className="fade-up-1 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-zinc-300 mb-8">
            <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full animate-pulse" />
            The AI engine behind viral UGC ads
          </div>

          {/* headline */}
          <h1 className="fade-up-2 syne font-800 text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-tight max-w-4xl mb-6">
            Your brand.<br />
            <span className="text-[#7c3aed]">Everywhere.</span><br />
            <span className="text-zinc-500">Without a camera.</span>
          </h1>

          <p className="fade-up-3 text-zinc-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
            Create a consistent AI influencer from one photo. Drop it into viral video templates. Ship UGC ads in minutes — not days.
          </p>

          <div className="fade-up-4 flex items-center gap-3 flex-wrap justify-center">
            <Link href="/login" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-4 rounded-xl font-semibold text-base transition shadow-lg shadow-[#7c3aed]/20">
              Start for free →
            </Link>
            <a href="#features" className="border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-8 py-4 rounded-xl font-medium text-base transition">
              See how it works
            </a>
          </div>

          <p className="fade-up-4 text-zinc-600 text-xs mt-5">No credit card required · First 10 credits free</p>

          {/* floating mockup cards */}
          <div className="relative mt-20 w-full max-w-4xl mx-auto h-[380px] hidden md:block">

            {/* center card */}
            <div className="float absolute left-1/2 -translate-x-1/2 top-0 w-56 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 z-20">
              <div className="bg-zinc-900 p-3">
                <div className="bg-zinc-800 rounded-xl aspect-[9/13] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#7c3aed]/10 to-transparent" />
                  <div className="w-16 h-16 rounded-full bg-zinc-700 border-2 border-[#7c3aed]/40" />
                  <div className="space-y-1.5 w-full px-4">
                    <div className="h-2 bg-zinc-700 rounded-full w-3/4 mx-auto" />
                    <div className="h-2 bg-zinc-700 rounded-full w-1/2 mx-auto" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-[#7c3aed]/90 rounded-lg py-1.5 text-center text-[10px] font-semibold text-white">
                    AI Influencer ✦
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between px-1">
                  <span className="text-[10px] text-zinc-400">iPhone Mirror Selfie</span>
                  <span className="text-[10px] text-[#7c3aed]">Generated</span>
                </div>
              </div>
            </div>

            {/* left card */}
            <div className="float-delay absolute left-[10%] top-10 w-48 rounded-2xl overflow-hidden border border-white/8 shadow-xl shadow-black/50 z-10 opacity-80">
              <div className="bg-zinc-900 p-3">
                <div className="bg-zinc-800 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent" />
                  <div className="text-center z-10">
                    <div className="text-2xl mb-1">🎬</div>
                    <div className="text-[10px] text-zinc-400">Video Clone</div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-violet-500 rounded-full" />
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
                    <span className="text-[9px] text-zinc-400">Cloning in progress...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* right card */}
            <div className="float-delay-2 absolute right-[10%] top-6 w-48 rounded-2xl overflow-hidden border border-white/8 shadow-xl shadow-black/50 z-10 opacity-80">
              <div className="bg-zinc-900 p-3">
                <div className="bg-zinc-800 rounded-xl p-3 space-y-2">
                  <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Templates</div>
                  {['iPhone Mirror Selfie', 'Get Ready With Me', 'Product Hold', 'Street Style'].map((t, i) => (
                    <div key={t} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${i === 1 ? 'bg-[#7c3aed]/20 border border-[#7c3aed]/30' : 'bg-zinc-700/50'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-[#7c3aed]' : 'bg-zinc-600'}`} />
                      <span className={`text-[9px] ${i === 1 ? 'text-[#7c3aed]' : 'text-zinc-400'}`}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* small stat badges */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
              <div className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-[#7c3aed] text-sm">⚡</span>
                <span className="text-xs text-zinc-300">Generated in 4s</span>
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-sm">🔥</span>
                <span className="text-xs text-zinc-300">1-click templates</span>
              </div>
            </div>
          </div>

        </section>

        {/* TICKER */}
        <div className="border-y border-white/5 py-4 overflow-hidden bg-white/[0.02]">
          <div className="ticker flex gap-12 whitespace-nowrap w-max">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {['AI Influencer Creation', 'Viral Video Clone', 'UGC Photo Templates', 'Lip Sync', 'Product Placement', 'Director Mode', 'No Camera Needed', 'Pay As You Go'].map((item) => (
                  <span key={item} className="text-zinc-500 text-sm flex items-center gap-3">
                    <span className="text-[#7c3aed]">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section id="features" className="px-6 md:px-10 py-28 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#7c3aed] text-sm font-medium uppercase tracking-widest mb-3">Features</p>
            <h2 className="syne text-4xl md:text-5xl font-bold">Everything you need to<br />go viral on autopilot</h2>
          </div>

          {/* bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* big feature 1 */}
            <div className="card-hover md:col-span-7 bg-zinc-900/60 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#7c3aed]/8 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 border border-[#7c3aed]/30 flex items-center justify-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="6" r="3.5" stroke="#7c3aed" strokeWidth="1.5"/>
                    <path d="M2 15.5C2 12.462 5.134 10 9 10s7 2.462 7 5.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="syne text-2xl font-bold mb-3">AI Influencer Creation</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">Upload one photo. We generate a hyper-consistent AI character that looks the same across every photo and video you create. No LoRA training. No technical setup. One click.</p>
                <div className="flex flex-wrap gap-2">
                  {['FaceID Technology', 'Consistent across content', '1 photo needed', 'Instant generation'].map(tag => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/8 rounded-full px-3 py-1 text-zinc-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* small feature */}
            <div className="card-hover md:col-span-5 bg-zinc-900/60 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/8 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 13.5v-9Z" stroke="#a78bfa" strokeWidth="1.5"/>
                    <path d="M7.5 6.5l4 2.5-4 2.5V6.5Z" fill="#a78bfa"/>
                  </svg>
                </div>
                <h3 className="syne text-2xl font-bold mb-3">Viral Video Clone</h3>
                <p className="text-zinc-400 leading-relaxed">Drop any viral TikTok or Reel. Your AI influencer's face gets mapped onto it — same energy, your brand.</p>
                <div className="mt-6 bg-zinc-800/60 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center text-sm">🎬</div>
                  <div>
                    <div className="text-xs text-white font-medium">viral_dance.mp4</div>
                    <div className="text-[10px] text-violet-400">Cloning... 87%</div>
                  </div>
                  <div className="ml-auto w-12 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-violet-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* photo templates */}
            <div className="card-hover md:col-span-5 bg-zinc-900/60 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-600/8 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="4" width="14" height="11" rx="2" stroke="#f472b6" strokeWidth="1.5"/>
                    <circle cx="6.5" cy="8.5" r="1.5" stroke="#f472b6" strokeWidth="1.5"/>
                    <path d="M2 12l4-3 3 2.5 3-3 4 4" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="syne text-2xl font-bold mb-3">Photo Templates</h3>
                <p className="text-zinc-400 leading-relaxed mb-4">No prompts. No guesswork. Click a tile, get a UGC-ready photo. Optimized system prompts run silently in the background.</p>
                <div className="grid grid-cols-2 gap-2">
                  {['📱 iPhone Mirror', '💄 Get Ready With Me', '🛍️ Product Hold', '🌆 Street Style'].map(t => (
                    <div key={t} className="bg-zinc-800/60 rounded-lg px-3 py-2 text-xs text-zinc-300">{t}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* coming soon */}
            <div className="card-hover md:col-span-7 bg-zinc-900/60 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full">Coming soon</div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500/6 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3v3M9 12v3M3 9h3M12 9h3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="9" r="2.5" stroke="#fbbf24" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="syne text-2xl font-bold mb-3">Lip Sync & Director Mode</h3>
                <p className="text-zinc-400 leading-relaxed">Type a script — your AI influencer speaks it. Or go full director: set a start frame, end frame, and prompt. Full creative control, zero filming.</p>
                <div className="flex gap-2 mt-6">
                  <div className="flex-1 bg-zinc-800/60 rounded-xl p-3">
                    <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Lip Sync</div>
                    <div className="text-xs text-zinc-300">"Hey, check out this product..."</div>
                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex-1 bg-amber-500/40 rounded-full" style={{height: `${8 + Math.sin(i) * 6}px`}} />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 bg-zinc-800/60 rounded-xl p-3">
                    <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Director Mode</div>
                    <div className="flex gap-1.5 mt-1">
                      <div className="flex-1 aspect-square bg-zinc-700 rounded-lg flex items-center justify-center text-[10px] text-zinc-500">Start</div>
                      <div className="flex items-center text-zinc-600 text-xs">→</div>
                      <div className="flex-1 aspect-square bg-zinc-700 rounded-lg flex items-center justify-center text-[10px] text-zinc-500">End</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="px-6 md:px-10 py-24 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#7c3aed] text-sm font-medium uppercase tracking-widest mb-3">How it works</p>
            <h2 className="syne text-4xl md:text-5xl font-bold mb-16">Three steps to viral content</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Upload a photo', desc: 'One clear face photo is all you need. We create your AI influencer instantly.', color: '#7c3aed' },
                { step: '02', title: 'Pick a template', desc: 'Choose from curated viral formats. iPhone selfie, GRWM, product hold — done.', color: '#a78bfa' },
                { step: '03', title: 'Download & post', desc: 'Your content is ready in seconds. Post across TikTok, Reels, YouTube Shorts.', color: '#f472b6' },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl border mx-auto mb-5 flex items-center justify-center" style={{ borderColor: `${color}30`, backgroundColor: `${color}15` }}>
                    <span className="syne font-bold text-lg" style={{ color }}>{step}</span>
                  </div>
                  <h3 className="syne text-xl font-bold mb-2">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '<5s', label: 'Photo generation' },
              { val: '1', label: 'Photo needed' },
              { val: '100%', label: 'Faceless-ready' },
              { val: '$0', label: 'To start' },
            ].map(({ val, label }) => (
              <div key={label} className="space-y-1">
                <p className="syne text-4xl md:text-5xl font-bold text-[#7c3aed]">{val}</p>
                <p className="text-zinc-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 py-24">
          <div className="max-w-3xl mx-auto text-center bg-zinc-900/60 border border-white/8 rounded-3xl p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/5 via-transparent to-violet-600/5 rounded-3xl" />
            <div className="relative">
              <h2 className="syne text-4xl md:text-5xl font-bold mb-4">Ready to go viral?</h2>
              <p className="text-zinc-400 text-lg mb-8 font-light">Join creators and brands already generating AI content that converts.</p>
              <Link href="/login" className="inline-block bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-10 py-4 rounded-xl font-semibold text-base transition shadow-xl shadow-[#7c3aed]/20">
                Start for free — no card needed
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 px-6 md:px-10 py-8 flex items-center justify-between text-zinc-600 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#7c3aed] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L4 6h3L3.5 12.5l7-7H7l2.5-4z" fill="white"/>
              </svg>
            </div>
            <span>Viramaxx</span>
          </div>
          <p>© 2025 Viramaxx. All rights reserved.</p>
        </footer>

      </div>
    </>
  )
}