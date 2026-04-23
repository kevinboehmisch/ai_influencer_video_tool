import { createServiceClient } from '@/lib/supabase/server'

type CreateJobInput = {
  userId: string
  influencerId?: string
  type: 'photo' | 'video_clone' | 'lip_sync'
  templateId?: string
  inputUrl?: string
}

export async function createJobRecord(input: CreateJobInput) {
  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from('jobs')
    .insert({
      user_id: input.userId,
      influencer_id: input.influencerId,
      type: input.type,
      template_id: input.templateId,
      input_url: input.inputUrl,
      status: 'processing',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateJobStatus(
  jobId: string,
  status: 'completed' | 'failed',
  outputUrl?: string,
  errorMessage?: string
) {
  const supabase = await createServiceClient()

  await supabase
    .from('jobs')
    .update({ status, output_url: outputUrl, error_message: errorMessage })
    .eq('id', jobId)
}

export async function getJobById(jobId: string) {
  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single()

  if (error) throw error
  return data
}

export async function getUserJobs(userId: string) {
  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}