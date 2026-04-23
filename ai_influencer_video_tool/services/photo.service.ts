import { generateImageWithFace } from '@/api/fal.api'
import { createJobRecord, updateJobStatus } from '@/repositories/job.repo'

export const PHOTO_TEMPLATES = [
  {
    id: 'iphone-mirror-selfie',
    label: 'iPhone Mirror Selfie',
    emoji: '📱',
    prompt: 'A young woman taking a mirror selfie with an iPhone, casual UGC style, natural lighting, bathroom or bedroom background, authentic social media aesthetic, photorealistic',
  },
  {
    id: 'get-ready-with-me',
    label: 'Get Ready With Me',
    emoji: '💄',
    prompt: 'A young woman doing her makeup at a vanity, get ready with me style, ring light, beauty influencer aesthetic, authentic UGC content, photorealistic',
  },
  {
    id: 'product-hold',
    label: 'Product Hold',
    emoji: '🛍️',
    prompt: 'A young woman holding a product towards camera, UGC ad style, clean background, natural smile, authentic review style, photorealistic',
  },
  {
    id: 'street-style',
    label: 'Street Style',
    emoji: '🌆',
    prompt: 'A young woman in street style outfit, urban background, golden hour lighting, fashion influencer aesthetic, candid shot, photorealistic',
  },
  {
    id: 'cozy-lifestyle',
    label: 'Cozy Lifestyle',
    emoji: '☕',
    prompt: 'A young woman in cozy home setting with coffee, lifestyle influencer aesthetic, warm lighting, authentic UGC style, photorealistic',
  },
  {
    id: 'gym-fitness',
    label: 'Gym & Fitness',
    emoji: '💪',
    prompt: 'A young woman at gym in workout clothes, fitness influencer aesthetic, gym background, energetic pose, authentic UGC style, photorealistic',
  },
]

export async function generatePhoto(
  userId: string,
  influencerId: string,
  faceImageUrl: string,
  templateId: string
): Promise<{ jobId: string }> {
  const template = PHOTO_TEMPLATES.find(t => t.id === templateId)
  if (!template) throw new Error('Template not found')

  // Job in DB anlegen
  const job = await createJobRecord({
    userId,
    influencerId,
    type: 'photo',
    templateId,
  })

  // Async generieren — nicht awaiten damit Response sofort zurückkommt
  generateImageWithFace(faceImageUrl, template.prompt)
    .then(outputUrl => updateJobStatus(job.id, 'completed', outputUrl))
    .catch(err => updateJobStatus(job.id, 'failed', undefined, err.message))

  return { jobId: job.id }
}