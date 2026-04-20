
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('homepage visual snapshot @slow', async ({ page }) => {
    await page.goto('/');
    // Wait for animations to settle
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('homepage.png', {
        fullPage: true,
        mask: [page.locator('.animate-marquee')] // Mask moving elements
    });
  });

  test('treatments page visual snapshot @slow', async ({ page }) => {
    await page.goto('/treatments');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('treatments.png', { fullPage: true });
  });

  test('procedures page visual snapshot @slow', async ({ page }) => {
    await page.goto('/procedures');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('procedures.png', { fullPage: true });
  });
});
