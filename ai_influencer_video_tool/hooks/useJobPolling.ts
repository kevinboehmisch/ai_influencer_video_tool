import { useState, useEffect, useCallback } from 'react'

type JobStatus = 'processing' | 'completed' | 'failed'

type Job = {
  id: string
  status: JobStatus
  output_url?: string
  error_message?: string
}

export function useJobPolling(jobId: string | null) {
  const [job, setJob] = useState<Job | null>(null)
  const [isPolling, setIsPolling] = useState(false)

  const poll = useCallback(async () => {
    if (!jobId) return
    setIsPolling(true)

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`)
        const data = await res.json()
        setJob(data.job)

        if (data.job.status === 'completed' || data.job.status === 'failed') {
          clearInterval(interval)
          setIsPolling(false)
        }
      } catch {
        clearInterval(interval)
        setIsPolling(false)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [jobId])

  useEffect(() => {
    if (jobId) poll()
  }, [jobId, poll])

  return { job, isPolling }
}