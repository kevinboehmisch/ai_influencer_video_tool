'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useJobPolling } from '@/hooks/useJobPolling'

export default function VideosPage() {
  const router = useRouter()
  const [influencers, setInfluencers] = useState<{ id: string; name: string }[]>([])
  const [selectedInfluencer, setSelectedInfluencer] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { job, isPolling } = useJobPolling(jobId)

  useEffect(() => {
    fetch('/api/influencers')
      .then(r => r.json())
      .then(d => {
        setInfluencers(d.influencers ?? [])
        if (d.influencers?.length > 0) setSelectedInfluencer(d.influencers[0].id)
      })
  }, [])

  function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setVideoFile(f)
    setVideoPreview(URL.createObjectURL(f))
  }

  async function handleClone() {
    if (!videoFile || !selectedInfluencer) return
    setLoading(true)
    setError(null)
    setJobId(null)

    try {
      const formData = new FormData()
      formData.append('file', videoFile)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      const { url, error: uploadError } = await uploadRes.json()
      if (uploadError) throw new Error(uploadError)

      const cloneRes = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencerId: selectedInfluencer, videoUrl: url }),
      })
      const data = await cloneRes.json()
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
          <h1 className="text-2xl font-bold">Video Clone</h1>
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
              <label className="block text-sm text-zinc-400 mb-3">Upload Viral Video</label>
              <div
                onClick={() => document.getElementById('video-upload')?.click()}
                className="w-full rounded-2xl border-2 border-dashed border-zinc-700 hover:border-violet-500 transition cursor-pointer bg-zinc-900 overflow-hidden"
              >
                {videoPreview ? (
                  <video src={videoPreview} controls className="w-full max-h-64 object-contain" />
                ) : (
                  <div className="py-16 text-center space-y-2">
                    <div className="text-4xl">🎬</div>
                    <p className="text-zinc-400 text-sm">Click to upload video</p>
                    <p className="text-zinc-600 text-xs">MP4, MOV, WEBM · Max 100MB</p>
                  </div>
                )}
              </div>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
            </div>

            <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg">⚡</p>
                <p className="text-xs text-zinc-400 mt-1">Async processing</p>
              </div>
              <div>
                <p className="text-lg">🎭</p>
                <p className="text-xs text-zinc-400 mt-1">Face mapped onto video</p>
              </div>
              <div>
                <p className="text-lg">📱</p>
                <p className="text-xs text-zinc-400 mt-1">Ready to post</p>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              onClick={handleClone}
              disabled={!videoFile || !selectedInfluencer || loading || isPolling}
              className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition"
            >
              {loading ? 'Uploading...' : isPolling ? '🎬 Cloning in progress...' : 'Clone Video →'}
            </button>

            {isPolling && (
              <div className="bg-zinc-900/60 border border-violet-500/20 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse" />
                <div>
                  <p className="font-medium text-sm">Cloning in progress...</p>
                  <p className="text-xs text-zinc-500 mt-0.5">This takes 30–60 seconds</p>
                </div>
              </div>
            )}

            {job?.status === 'completed' && job.output_url && (
              <div className="bg-zinc-900/60 border border-green-500/20 rounded-2xl p-6 space-y-4">
                <p className="text-green-400 font-medium">✅ Video ready!</p>
                <video src={job.output_url} controls className="w-full rounded-xl" />
                
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
                Failed: {job.error_message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}