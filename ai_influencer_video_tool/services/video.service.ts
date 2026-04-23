import { cloneVideoWithFace } from '@/api/fal.api'
import { createJobRecord, updateJobStatus } from '@/repositories/job.repo'

export async function cloneVideo(
  userId: string,
  influencerId: string,
  faceImageUrl: string,
  videoUrl: string
): Promise<{ jobId: string }> {
  const job = await createJobRecord({
    userId,
    influencerId,
    type: 'video_clone',
  })

  cloneVideoWithFace(faceImageUrl, videoUrl)
    .then(outputUrl => updateJobStatus(job.id, 'completed', outputUrl))
    .catch(err => updateJobStatus(job.id, 'failed', undefined, err.message))

  return { jobId: job.id }
}