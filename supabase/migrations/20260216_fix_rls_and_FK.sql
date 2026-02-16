-- Enable RLS
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Create Public Read Policies
CREATE POLICY "Public read treatments"
ON treatments
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Public read departments"
ON departments
FOR SELECT
TO anon
USING (true);

-- Ensure FK Constraint (Idempotent approach)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'treatments_department_id_fkey'
    ) THEN
        ALTER TABLE treatments
        ADD CONSTRAINT treatments_department_id_fkey
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE;
    END IF;
END $$;
