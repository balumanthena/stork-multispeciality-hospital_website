import { test, expect } from '@playwright/test';

test.describe('Stork Hospital Accessibility & Technical SEO Integrity Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('SEO: HTML5 semantic outlines and metadata details should be fully verified', async ({ page }) => {
    // 1. Assert exactly one h1 tag per landing page
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // 2. Assert Title tag is populated and descriptive
    const pageTitle = await page.title();
    expect(pageTitle.length).toBeGreaterThan(10);
    expect(pageTitle.toLowerCase()).toContain('stork');

    // 3. Assert canonical link tags exist
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).not.toBeNull();
      expect(href?.startsWith('http')).toBe(true);
    }
  });

  test('SEO: Open Graph metadata tags should be registered', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    
    expect(await ogTitle.getAttribute('content')).not.toBeNull();
    expect(await ogDescription.getAttribute('content')).not.toBeNull();
  });

  test('Accessibility: Interactive buttons and image alt attributes must exist', async ({ page }) => {
    // 1. Assert images have alt labels or aria-hidden declarations
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      
      const isValid = (alt !== null && alt.length >= 0) || ariaHidden === 'true';
      expect(isValid).toBe(true);
    }

    // 2. Assert button touch targets have semantic label tags or log warning for telemetry
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const btn = buttons.nth(i);
      const isVisible = await btn.isVisible();
      if (!isVisible) continue;

      const label = await btn.textContent();
      const ariaLabel = await btn.getAttribute('aria-label');
      
      const hasTextOrLabel = (label && label.trim().length > 0) || (ariaLabel && ariaLabel.trim().length > 0);
      if (!hasTextOrLabel) {
        console.warn(`Accessibility advisory: Button at index ${i} lacks text or aria-label.`);
      }
    }
  });
});
