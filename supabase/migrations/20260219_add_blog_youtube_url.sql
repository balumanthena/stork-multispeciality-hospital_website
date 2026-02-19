-- Add youtube_url column to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Update RLS if necessary (already covers all columns usually, checking previous migrations... 
-- 20260216_fix_rls_and_FK.sql likely covers it or generic policies)
-- Usually adding a column doesn't require RLS update if 'true' or 'all' is used for select/insert on row.
