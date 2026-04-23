import { createServiceClient } from '@/lib/supabase/server'

type CreateInfluencerInput = {
  userId: string
  name: string
  faceImageUrl: string
}

export async function createInfluencerRecord(input: CreateInfluencerInput) {
  
    const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('influencers')
    .insert({
      user_id: input.userId,
      name: input.name,
      face_image_url: input.faceImageUrl,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getInfluencersByUser(userId: string) {
  
    const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('influencers')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getInfluencerById(id: string) {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('influencers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}