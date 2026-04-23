import { createInfluencerRecord, getInfluencersByUser } from '@/repositories/influencer.repo'

export async function createInfluencer(
  userId: string,
  name: string,
  faceImageUrl: string
) {
  return createInfluencerRecord({ userId, name, faceImageUrl })
}

export async function getUserInfluencers(userId: string) {
  return getInfluencersByUser(userId)
}