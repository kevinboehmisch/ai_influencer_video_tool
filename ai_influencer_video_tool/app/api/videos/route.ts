import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { cloneVideo } from '@/services/video.service'
import { getInfluencerById } from '@/repositories/influencer.repo'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { influencerId, videoUrl } = await request.json()
  if (!influencerId || !videoUrl) {
    return NextResponse.json({ error: 'influencerId and videoUrl required' }, { status: 400 })
  }

  const influencer = await getInfluencerById(influencerId)
  if (!influencer || influencer.user_id !== user.id) {
    return NextResponse.json({ error: 'Influencer not found' }, { status: 404 })
  }

  const { jobId } = await cloneVideo(
    user.id,
    influencerId,
    influencer.face_image_url,
    videoUrl
  )

  return NextResponse.json({ jobId }, { status: 201 })
}