'use client'

import { useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState<string>('')

  async function testGetInfluencers() {
    const res = await fetch('/api/influencers')
    const data = await res.json()
    setResult(JSON.stringify(data, null, 2))
  }

  async function testCreateInfluencer() {
    const res = await fetch('/api/influencers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Influencer',
        faceImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/320px-Gatto_europeo4.jpg',
      }),
    })
    const data = await res.json()
    setResult(JSON.stringify(data, null, 2))
  }

  async function testGetJobs() {
    const res = await fetch('/api/jobs/test-id')
    const data = await res.json()
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6">
      <h1 className="text-2xl font-bold">API Test</h1>
      <div className="flex flex-wrap gap-3">
        <button onClick={testGetInfluencers} className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 text-sm">
          GET /api/influencers
        </button>
        <button onClick={testCreateInfluencer} className="bg-violet-600 px-4 py-2 rounded-lg hover:bg-violet-500 text-sm">
          POST /api/influencers
        </button>
        <button onClick={testGetJobs} className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 text-sm">
          GET /api/jobs/test-id
        </button>
      </div>
      {result && (
        <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-green-400 overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </div>
  )
}