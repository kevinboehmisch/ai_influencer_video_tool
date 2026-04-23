import { fal } from '@fal-ai/client'

// FAL_KEY wird automatisch aus process.env gelesen — kein config() nötig

export type FalImageResult = {
  images: { url: string }[]
}

export type FalVideoResult = {
  video: { url: string }
}

// FLUX PuLID — Bild mit Gesicht generieren
export async function generateImageWithFace(
  faceImageUrl: string,
  prompt: string
): Promise<string> {
  const result = await fal.subscribe('fal-ai/flux-pulid', {
    input: {
      main_face_image: faceImageUrl,
      prompt,
      num_images: 1,
    },
  })

  const data = result.data as FalImageResult
  return data.images[0].url
}

// LivePortrait — Gesicht auf Video klonen
export async function cloneVideoWithFace(
  faceImageUrl: string,
  videoUrl: string
): Promise<string> {
  const result = await fal.subscribe('fal-ai/liveportrait', {
    input: {
      image_url: faceImageUrl,
      video_url: videoUrl,
    },
  })

  const data = result.data as FalVideoResult
  return data.video.url
}