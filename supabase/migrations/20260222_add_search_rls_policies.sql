-- Enable RLS for treatments if not already enabled
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- Drop existing public read policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access to treatments" ON treatments;

-- Create policy allowing anyone to read treatments
CREATE POLICY "Allow public read access to treatments"
ON treatments
FOR SELECT
TO public
USING (true);

-- Enable RLS for doctors if not already enabled
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Drop existing public read policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access to doctors" ON doctors;

-- Create policy allowing anyone to read doctors
CREATE POLICY "Allow public read access to doctors"
ON doctors
FOR SELECT
TO public
USING (true);
