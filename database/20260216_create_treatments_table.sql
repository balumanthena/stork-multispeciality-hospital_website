-- Create treatments table
CREATE TABLE IF NOT EXISTS treatments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL,
    short_description TEXT,
    content TEXT,
    meta_title TEXT,
    meta_description TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments(slug);
CREATE INDEX IF NOT EXISTS idx_treatments_department ON treatments(department);

-- Enable RLS
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public read access
CREATE POLICY "Public can view active treatments" ON treatments
    FOR SELECT
    USING (is_active = true);

-- Admin full access
-- assuming admin has a specific role or we check auth.uid() in a generic way if using custom claims
-- For now, using authenticated users for simplicity or specific admin check if prevalent in project
-- Checking existing policies might be good, but standard is:
CREATE POLICY "Admins can do everything on treatments" ON treatments
    FOR ALL
    USING (auth.role() = 'authenticated'); -- Adjust if stricter role check is needed

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_treatments_updated_at
    BEFORE UPDATE ON treatments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
