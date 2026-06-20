-- Run this SQL in the SQL Editor of your correct Supabase project (zuaejzcrdswjrwvvfaft)
-- BEFORE running: go to Settings → API and confirm the anon key has insert permissions

CREATE TABLE IF NOT EXISTS public.curriculum_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  bottleneck text NOT NULL,
  interests text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.curriculum_interests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the landing page form)
CREATE POLICY "Allow anonymous inserts" ON public.curriculum_interests
  FOR INSERT TO anon WITH CHECK (true);

-- Only allow select for authenticated users (admin dashboard, etc.)
CREATE POLICY "Allow authenticated selects" ON public.curriculum_interests
  FOR SELECT TO authenticated USING (true);
