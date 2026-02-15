-- Add display_order to departments table
ALTER TABLE public.departments 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create index for display_order for faster sorting
CREATE INDEX IF NOT EXISTS idx_departments_display_order ON public.departments(display_order);
