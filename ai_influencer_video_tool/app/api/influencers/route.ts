import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { createInfluencer, getUserInfluencers } from '@/services/influencer.service'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = String(user.id)
    const influencers = await getUserInfluencers(userId)
    return NextResponse.json({ influencers })
  } catch (err) {
    console.error('GET /api/influencers:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = String(user.id)
    const body = await request.json()
    const { name, faceImageUrl } = body

    if (!name || !faceImageUrl) {
      return NextResponse.json({ error: 'name and faceImageUrl required' }, { status: 400 })
    }

    const influencer = await createInfluencer(userId, name, faceImageUrl)
    return NextResponse.json({ influencer }, { status: 201 })
  } catch (err) {
    console.error('POST /api/influencers:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}