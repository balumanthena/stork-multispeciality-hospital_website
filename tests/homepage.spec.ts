
import { test, expect } from '@playwright/test';

test.describe('Homepage Integrity', () => {
  test('should load homepage and verify core sections', async ({ page }) => {
    await page.goto('/');
    
    // Check Title
    await expect(page).toHaveTitle(/Stork Multispecialty Hospital/);

    // Check Hero Section
    await expect(page.locator('h1')).toBeVisible();
    
    // Check "Expert Care for Every Need" section
    const treatmentSection = page.locator('text=Expert Care for Every Need');
    await expect(treatmentSection).toBeVisible();
    
    // Check Emergency Section
    await expect(page.locator('text=Emergency?')).toBeVisible();
    
    // Performance check (rough proxy)
    const navigationStart = await page.evaluate(() => performance.timing.navigationStart);
    const loadEventEnd = await page.evaluate(() => performance.timing.loadEventEnd);
    const loadTime = (loadEventEnd - navigationStart) / 1000;
    
    console.log(`Homepage Load Time: ${loadTime}s`);
    expect(loadTime).toBeLessThan(5); // Allowing 5s for dev server, usually 3s for prod
  });
});
