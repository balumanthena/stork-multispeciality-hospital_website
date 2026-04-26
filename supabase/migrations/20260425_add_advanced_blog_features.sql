-- Migration: Add Advanced Blog Editor Features (SEO, FAQ, TOC, Sticky CTA)
-- Date: 2026-04-25
-- Description: Adds optional JSON and boolean columns to support advanced content schemas without breaking existing rows.

-- 1. Advanced SEO Fields
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS focus_keyword TEXT;

-- 2. Content Structure (TOC)
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS enable_toc BOOLEAN DEFAULT false;

-- 3. FAQ Schema
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS enable_faq BOOLEAN DEFAULT false;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS faq_data JSONB DEFAULT '[]'::jsonb;

-- 4. Sticky CTA
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS enable_sticky_cta BOOLEAN DEFAULT false;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS sticky_cta_text TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS sticky_cta_link TEXT;
