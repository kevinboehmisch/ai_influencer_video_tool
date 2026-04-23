import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { generatePhoto } from '@/services/photo.service'
import { getInfluencerById } from '@/repositories/influencer.repo'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { influencerId, templateId } = await request.json()
  if (!influencerId || !templateId) {
    return NextResponse.json({ error: 'influencerId and templateId required' }, { status: 400 })
  }

  const influencer = await getInfluencerById(influencerId)
  if (!influencer || influencer.user_id !== user.id) {
    return NextResponse.json({ error: 'Influencer not found' }, { status: 404 })
  }

  const { jobId } = await generatePhoto(
    user.id,
    influencerId,
    influencer.face_image_url,
    templateId
  )

  return NextResponse.json({ jobId }, { status: 201 })
}