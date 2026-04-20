
import { test, expect } from '@playwright/test';
import { ICON_BASE_PATH, FALLBACK_ICON } from './utils/data-utils';

test.describe('Icon Integrity', () => {
  test('verify treatment icons load or use fallback @slow', async ({ page }) => {
    await page.goto('/treatments');
    
    // Select all images within treatment cards
    const icons = page.locator('img[alt]');
    const count = await icons.count();
    
    console.log(`Checking ${count} treatment icons...`);
    
    const brokenIcons: string[] = [];
    const isFast = process.env.FAST === 'true';

    for (let i = 0; i < count; i++) {
      const icon = icons.nth(i);
      const src = await icon.getAttribute('src');
      const alt = await icon.getAttribute('alt');

      if (!src) {
        brokenIcons.push(`${alt || 'Unknown'} (No src)`);
        continue;
      }

      // OPTIMIZATION: Skip heavy validation in fast mode
      if (!isFast) {
        const isLoaded = await icon.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
        if (!isLoaded) {
            brokenIcons.push(`${alt}: ${src}`);
        }
      }
    }

    if (brokenIcons.length > 0) {
      console.error('Broken Icons Details:', brokenIcons);
    }

    expect(brokenIcons.length, `Broken icons found: ${brokenIcons.join(', ')}`).toBe(0);
  });
});
