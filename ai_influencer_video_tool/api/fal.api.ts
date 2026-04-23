import { fal } from '@fal-ai/client'

export type FalImageResult = {
  images: { url: string }[]
}

export type FalVideoResult = {
  video: { url: string }
}

export async function generateImageWithFace(
  faceImageUrl: string,
  prompt: string
): Promise<string> {
  const result = await fal.subscribe('fal-ai/flux-pulid', {
    input: {
      // Genau so, wie es in der Doku steht:
      reference_image_url: faceImageUrl,
      prompt: prompt,
      // Optional: Hochkant ist für UGC/Selfies meistens besser als das Standard-Querformat!
      image_size: "portrait_4_3", 
      num_inference_steps: 20,
    } as Record<string, unknown>,
  })

  const data = result.data as FalImageResult
  return data.images[0].url
}

export async function cloneVideoWithFace(
  faceImageUrl: string,
  videoUrl: string
): Promise<string> {
  // Beachte: Für liveportrait könnten die Keys anders heißen als bei flux-pulid.
  // Falls das Video später auch 422 wirft, müssen wir auch hier in die Fal-Doku schauen!
  const result = await fal.subscribe('fal-ai/live-portrait', {
    input: {
      image_url: faceImageUrl,
      video_url: videoUrl,
    } as Record<string, unknown>,
  })

  const data = result.data as FalVideoResult
  return data.video.url
}