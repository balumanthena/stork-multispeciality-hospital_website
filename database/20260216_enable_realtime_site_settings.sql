-- Enable REPLICA IDENTITY FULL to ensure all columns are available in the Realtime payload
ALTER TABLE public.site_settings REPLICA IDENTITY FULL;

-- Note: You must also enable "Realtime" for the 'site_settings' table in the Supabase Dashboard:
-- 1. Go to Database -> Replication
-- 2. Toggle 'site_settings' to ON
-- OR
-- 1. Go to Table Editor -> site_settings
-- 2. Click "Realtime off" (top right) -> Enable Realtime
