# AI Influencer Video Tool — Project Documentation

## Overview
A SaaS platform that lets users create consistent AI influencer characters from a single photo and generate viral UGC content (photos + videos) without a camera. Target audience: content creators, brand owners, marketers, and "gurus" who want to demo the tool to their audience.

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Frontend/Backend | Next.js 16 + TypeScript | App Router, Turbopack |
| Hosting | Vercel (planned) | currently local dev |
| Auth + DB + Storage | Supabase | RLS enabled |
| AI Inference | Fal.ai | FLUX PuLID + LivePortrait |
| Payments | Stripe | not yet integrated |

---

## Project Structure

```
ai_influencer_video_tool/
├── app/                          # Next.js App Router (pages + API routes)
│   ├── page.tsx                  # Landing Page (/)
│   ├── login/
│   │   └── page.tsx              # Login/Signup Page (/login)
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # Supabase OAuth callback (/auth/callback)
│   ├── dashboard/
│   │   ├── page.tsx              # Main Dashboard (/dashboard)
│   │   ├── influencers/
│   │   │   └── page.tsx          # Create & manage AI Influencers
│   │   ├── photos/
│   │   │   └── page.tsx          # Photo template generation
│   │   └── videos/
│   │       └── page.tsx          # Video clone feature
│   ├── api/                      # Next.js Route Handlers
│   │   ├── upload/
│   │   │   └── route.ts          # File upload to Supabase Storage
│   │   ├── influencers/
│   │   │   └── route.ts          # GET + POST influencers
│   │   ├── photos/
│   │   │   └── route.ts          # POST → trigger photo generation job
│   │   ├── videos/
│   │   │   └── route.ts          # POST → trigger video clone job
│   │   └── jobs/
│   │       └── [id]/
│   │           └── route.ts      # GET job status (for polling)
│   └── test/
│       └── page.tsx              # Dev-only API test page (/test)
│
├── api/                          # External API wrappers (NOT Next.js routes)
│   └── fal.api.ts                # All fal.ai calls (generateImageWithFace, cloneVideoWithFace)
│
├── services/                     # Business logic layer
│   ├── influencer.service.ts     # createInfluencer, getUserInfluencers
│   ├── photo.service.ts          # generatePhoto (selects template prompt, creates job)
│   └── video.service.ts          # cloneVideo (uploads video, creates job)
│
├── repositories/                 # Database access layer
│   ├── influencer.repo.ts        # CRUD for influencers table
│   ├── job.repo.ts               # CRUD for jobs table (createJobRecord, updateJobStatus, getJobById)
│   └── user.repo.ts              # (placeholder)
│
├── components/
│   ├── ui/
│   │   └── SignOutButton.tsx     # Client component for sign out
│   ├── layout/                   # (placeholder)
│   └── features/                 # (placeholder)
│       ├── influencer/
│       ├── templates/
│       └── video/
│
├── hooks/
│   └── useJobPolling.ts          # Polls /api/jobs/[id] every 2s until completed/failed
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client (for Client Components)
│   │   └── server.ts             # Server Supabase client + Service Role client
│   └── fal/
│       └── client.ts             # (placeholder, actual config is in api/fal.api.ts)
│
├── types/                        # TypeScript interfaces (placeholder files)
├── utils/                        # Helper functions (placeholder)
├── proxy.ts                      # Next.js Middleware (auth guard, renamed from middleware.ts)
└── .env.local                    # Environment variables (never commit!)
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...        # Legacy anon key (JWT format)
SUPABASE_SERVICE_ROLE_KEY=eyJ...            # Legacy service_role key (JWT format)

# Fal.ai
FAL_KEY=...                                  # From fal.ai dashboard → API Keys

# Stripe (not yet integrated)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

> ⚠️ Always use the **Legacy JWT format** keys from Supabase (eyJ...), NOT the new sb_publishable/sb_secret format. The supabase-js client requires JWT format.

---

## Database Schema (Supabase)

### `profiles`
Automatically created on user signup via Postgres trigger.

| Column | Type | Notes |
|---|---|---|
| id | uuid | FK → auth.users(id) |
| email | text | |
| full_name | text | nullable |
| avatar_url | text | nullable |
| plan | text | 'free' or 'pro', default 'free' |
| credits | integer | default 10 |
| created_at | timestamptz | |
| updated_at | timestamptz | auto-updated via trigger |

### `influencers`
AI characters created by users.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles(id) |
| name | text | user-defined name |
| face_image_url | text | URL in Supabase Storage (images bucket) |
| fal_request_id | text | nullable |
| created_at | timestamptz | |

### `jobs`
Async generation jobs (photos + videos).

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles(id) |
| influencer_id | uuid | FK → influencers(id) |
| type | text | 'photo', 'video_clone', 'lip_sync' |
| status | text | 'pending', 'processing', 'completed', 'failed' |
| input_url | text | uploaded video/audio URL |
| output_url | text | generated result URL |
| fal_request_id | text | for manual polling if needed |
| template_id | text | which photo template was used |
| error_message | text | nullable |
| created_at | timestamptz | |
| updated_at | timestamptz | auto-updated via trigger |

### RLS Policies
- All tables have RLS enabled
- `authenticated` role: users can only access their own rows (user_id = auth.uid())
- `service_role`: full access to all rows (used by server-side repositories)
- Storage buckets (images, videos): authenticated users can upload, public can read

---

## Architecture & Data Flow

### Photo Generation Flow
```
User clicks "Generate Photo"
  → app/dashboard/photos/page.tsx (Client Component)
    → POST /api/photos (Route Handler)
      → services/photo.service.ts
        → repositories/job.repo.ts → creates job in DB (status: 'processing')
        → api/fal.api.ts → calls fal.ai FLUX PuLID (async, not awaited)
          → on success: job.repo.ts → updates job status to 'completed' + output_url
          → on failure: job.repo.ts → updates job status to 'failed' + error_message
      ← returns { jobId }
  → hooks/useJobPolling.ts polls GET /api/jobs/[id] every 2s
    → shows result when status === 'completed'
```

### Video Clone Flow
```
User uploads video + selects influencer
  → POST /api/upload → uploads video to Supabase Storage (videos bucket)
  → POST /api/videos (Route Handler)
    → services/video.service.ts
      → repositories/job.repo.ts → creates job (status: 'processing')
      → api/fal.api.ts → calls fal.ai LivePortrait (async, not awaited)
    ← returns { jobId }
  → hooks/useJobPolling.ts polls every 2s until done
```

### Auth Flow
```
/ (landing)    → always accessible
/login         → accessible only when NOT logged in
/dashboard/*   → accessible only when logged in (enforced by proxy.ts middleware)

Sign up        → supabase.auth.signUp() → Postgres trigger creates profile row
Sign in        → supabase.auth.signInWithPassword()
Sign out       → supabase.auth.signOut() → redirect to /
OAuth callback → /auth/callback/route.ts → exchanges code for session
```

---

## Fal.ai Models

### FLUX PuLID (`fal-ai/flux-pulid`)
Used for: Photo template generation

```typescript
input: {
  reference_image_url: string,  // face photo URL
  prompt: string,               // UGC-optimized prompt
  image_size: "portrait_4_3",   // better for UGC/selfies
  num_inference_steps: 20,
}
output: {
  images: [{ url: string }]
}
```

### LivePortrait (`fal-ai/live-portrait`)
Used for: Video clone (face swap onto viral video)

```typescript
input: {
  image_url: string,   // face photo URL
  video_url: string,   // viral video URL
}
output: {
  video: { url: string }
}
```

---

## Photo Templates

Defined in `services/photo.service.ts` as `PHOTO_TEMPLATES`:

| ID | Label | Prompt Focus |
|---|---|---|
| iphone-mirror-selfie | iPhone Mirror Selfie | casual UGC, bathroom/bedroom |
| get-ready-with-me | Get Ready With Me | beauty, ring light, vanity |
| product-hold | Product Hold | product towards camera, clean bg |
| street-style | Street Style | urban, golden hour, fashion |
| cozy-lifestyle | Cozy Lifestyle | home, coffee, warm lighting |
| gym-fitness | Gym & Fitness | gym, workout clothes, energetic |

---

## Key Design Decisions

### Why async job processing?
Video generation via LivePortrait takes 30–60 seconds. Vercel serverless functions time out after 10s (hobby) or 60s (pro). By returning a `jobId` immediately and processing in the background, we avoid timeouts. The frontend polls `/api/jobs/[id]` every 2 seconds.

### Why Fal.ai instead of direct APIs?
Single API key, aggregates multiple models (FLUX, LivePortrait, Kling), pay-as-you-go, no censorship issues for UGC content (bikini scenarios etc.), very fast cold starts.

### Why Service Role client in repositories?
Server-side repositories use the Supabase Service Role key which bypasses RLS. This is safe because these files only run on the server (never in the browser). The regular client (with anon key + user session) is used only for auth checks in Route Handlers.

### Two separate `api/` folders
- `api/fal.api.ts` — external API wrapper, plain TypeScript, no routing
- `app/api/` — Next.js Route Handlers, these are actual HTTP endpoints

---

## What's Not Yet Built

| Feature | Priority | Notes |
|---|---|---|
| Google OAuth | High | Supabase provider ready, needs Google Cloud Console setup |
| Vercel Deployment | High | Need to add env vars in Vercel dashboard |
| Jobs History in Dashboard | High | Show generated content in dashboard |
| Real stats in Dashboard | Medium | Currently hardcoded "0" |
| Stripe Integration | Medium | Pro plan payments |
| Lip Sync feature | Low (Post-MVP) | Kling Avatar v2 via fal.ai |
| Product Placement | Low (Post-MVP) | Upload product image |
| Director Mode | Low (Post-MVP) | Start/end frame + prompt |
| Affiliate system | Low (Post-MVP) | Rewardful integration |

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# App runs on http://localhost:3000
```

Make sure `.env.local` is present with all keys before starting.

---

## Common Issues & Fixes

| Error | Cause | Fix |
|---|---|---|
| `permission denied for table X` | RLS policy missing for service_role | Add policy `to service_role using (true) with check (true)` |
| `invalid input syntax for type uuid` | Wrong key format in Supabase | Use Legacy JWT keys (eyJ...) not sb_publishable/sb_secret |
| `Your project's URL and Key are required` | .env.local not loaded | Restart dev server after editing .env.local |
| `relation "profiles" does not exist` | Trigger missing search_path | Add `set search_path = public` to handle_new_user() function |
| Turbopack write error | File locked by another process | Restart dev server |
| `Unprocessable Entity` from fal.ai | Wrong input parameter name | Check fal.ai docs for exact parameter names per model |