ALTER TABLE blogs
ADD COLUMN show_in_main_blog BOOLEAN DEFAULT true,
ADD COLUMN show_in_department BOOLEAN DEFAULT true,
ADD COLUMN show_in_treatment BOOLEAN DEFAULT true;
