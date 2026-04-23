'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Influencer = {
  id: string
  name: string
  face_image_url: string
  created_at: string
}

export default function InfluencersPage() {
  const router = useRouter()
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/influencers')
      .then(r => r.json())
      .then(d => setInfluencers(d.influencers ?? []))
  }, [])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleCreate() {
    if (!name || !file) return
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const { url, error: uploadError } = await uploadRes.json()
      if (uploadError) throw new Error(uploadError)

      const createRes = await fetch('/api/influencers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, faceImageUrl: url }),
      })
      const { influencer, error: createError } = await createRes.json()
      if (createError) throw new Error(createError)

      setInfluencers(prev => [influencer, ...prev])
      setName('')
      setFile(null)
      setPreview(null)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">

        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-zinc-500 hover:text-white transition">
            ← Back
          </button>
          <h1 className="text-2xl font-bold">AI Influencers</h1>
        </div>

        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-6">Create New Influencer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <label className="block text-sm text-zinc-400 mb-3">Face Photo</label>
              <div
                onClick={() => document.getElementById('face-upload')?.click()}
                className="aspect-square max-w-xs rounded-2xl border-2 border-dashed border-zinc-700 hover:border-violet-500 transition cursor-pointer flex items-center justify-center overflow-hidden bg-zinc-900"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center space-y-2 p-6">
                    <div className="text-3xl">📸</div>
                    <p className="text-sm text-zinc-400">Click to upload</p>
                    <p className="text-xs text-zinc-600">JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>
              <input
                id="face-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Influencer Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Emma, Alex, Sophia..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition"
                  />
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-zinc-400">✅ Use a clear front-facing photo</p>
                  <p className="text-xs text-zinc-400">✅ Good lighting, no sunglasses</p>
                  <p className="text-xs text-zinc-400">✅ 1 face only in the photo</p>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                onClick={handleCreate}
                disabled={!name || !file || loading}
                className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition mt-4"
              >
                {loading ? 'Creating...' : 'Create AI Influencer ✨'}
              </button>
            </div>
          </div>
        </div>

        {influencers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Influencers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {influencers.map(inf => (
                <div
                  key={inf.id}
                  onClick={() => router.push(`/dashboard/photos?influencerId=${inf.id}`)}
                  className="bg-zinc-900/60 border border-white/5 hover:border-violet-500/50 rounded-2xl overflow-hidden cursor-pointer transition group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={inf.face_image_url}
                      alt={inf.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm">{inf.name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Click to use →</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}