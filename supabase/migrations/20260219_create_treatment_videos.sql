-- Create treatment_videos table
CREATE TABLE IF NOT EXISTS treatment_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    youtube_url TEXT NOT NULL,
    youtube_embed_url TEXT,
    thumbnail_url TEXT,
    treatment_id UUID REFERENCES treatments(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS Policies
ALTER TABLE treatment_videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for website)
CREATE POLICY "Public videos are viewable by everyone" 
ON treatment_videos FOR SELECT 
USING (true);

-- Allow authenticated admin full access
CREATE POLICY "Admins can manage videos" 
ON treatment_videos FOR ALL 
USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_treatment_videos_updated_at
    BEFORE UPDATE ON treatment_videos
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
