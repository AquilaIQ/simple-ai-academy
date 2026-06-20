-- Run this in the SQL Editor of your correct Supabase project (zuaejzcrdswjrwvvfaft)
-- to add the email column to the existing curriculum_interests table

ALTER TABLE public.curriculum_interests
ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '';

-- After adding, you can optionally remove the default if all rows are clean:
-- ALTER TABLE public.curriculum_interests ALTER COLUMN email DROP DEFAULT;
