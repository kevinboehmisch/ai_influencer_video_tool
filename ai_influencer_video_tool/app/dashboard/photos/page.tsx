'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useJobPolling } from '@/hooks/useJobPolling'

const TEMPLATES = [
  { id: 'iphone-mirror-selfie', label: 'iPhone Mirror Selfie', emoji: '📱', desc: 'Classic UGC selfie' },
  { id: 'get-ready-with-me', label: 'Get Ready With Me', emoji: '💄', desc: 'Beauty influencer' },
  { id: 'product-hold', label: 'Product Hold', emoji: '🛍️', desc: 'Product showcase' },
  { id: 'street-style', label: 'Street Style', emoji: '🌆', desc: 'Fashion content' },
  { id: 'cozy-lifestyle', label: 'Cozy Lifestyle', emoji: '☕', desc: 'Lifestyle content' },
  { id: 'gym-fitness', label: 'Gym & Fitness', emoji: '💪', desc: 'Fitness content' },
]

function PhotosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const influencerId = searchParams.get('influencerId')

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [influencers, setInfluencers] = useState<{ id: string; name: string }[]>([])
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>(influencerId ?? '')

  const { job, isPolling } = useJobPolling(jobId)

  useEffect(() => {
    fetch('/api/influencers')
      .then(r => r.json())
      .then(d => {
        setInfluencers(d.influencers ?? [])
        if (!influencerId && d.influencers?.length > 0) {
          setSelectedInfluencer(d.influencers[0].id)
        }
      })
  }, [influencerId])

  async function handleGenerate() {
    if (!selectedTemplate || !selectedInfluencer) return
    setLoading(true)
    setError(null)
    setJobId(null)

    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerId: selectedInfluencer,
          templateId: selectedTemplate,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setJobId(data.jobId)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-zinc-500 hover:text-white transition">
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Photo Templates</h1>
        </div>

        {influencers.length === 0 ? (
          <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-8 text-center">
            <p className="text-zinc-400 mb-4">No AI Influencer yet — create one first</p>
            <button
              onClick={() => router.push('/dashboard/influencers')}
              className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-medium transition"
            >
              Create Influencer →
            </button>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm text-zinc-400 mb-3">Select Influencer</label>
              <div className="flex gap-3 flex-wrap">
                {influencers.map(inf => (
                  <button
                    key={inf.id}
                    onClick={() => setSelectedInfluencer(inf.id)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                      selectedInfluencer === inf.id
                        ? 'bg-violet-600 border-violet-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    {inf.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-3">Pick a Template</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-6 rounded-2xl border text-left transition ${
                      selectedTemplate === t.id
                        ? 'bg-violet-600/20 border-violet-500'
                        : 'bg-zinc-900/60 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="text-3xl mb-3">{t.emoji}</div>
                    <p className="font-semibold text-sm">{t.label}</p>
                    <p className="text-xs text-zinc-500 mt-1">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={!selectedTemplate || !selectedInfluencer || loading || isPolling}
              className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition"
            >
              {loading ? 'Starting...' : isPolling ? '✨ Generating...' : 'Generate Photo'}
            </button>

            {job?.status === 'completed' && job.output_url && (
              <div className="bg-zinc-900/60 border border-green-500/20 rounded-2xl p-6 space-y-4">
                <p className="text-green-400 font-medium">✅ Photo ready!</p>
                <img
                  src={job.output_url}
                  alt="Generated"
                  className="w-full max-w-sm rounded-xl"
                />
                
                <a
                  href={job.output_url}
                  download
                  className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm hover:bg-zinc-200 transition"
                >
                  Download ↓
                </a>
              </div>
            )}

            {job?.status === 'failed' && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                Generation failed: {job.error_message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function PhotosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <PhotosContent />
    </Suspense>
  )
}