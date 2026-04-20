
import { test, expect } from '@playwright/test';

test.describe('Navigation Smoke Tests', () => {
  const routes = [
    { path: '/', expectedText: 'Care' },
    { path: '/about', expectedText: 'About' },
    { path: '/services', expectedText: 'Specialties' },
    { path: '/treatments', expectedText: 'Treatments' },
    { path: '/procedures', expectedText: 'Procedures' },
    { path: '/doctors', expectedText: 'Doctors' },
    { path: '/insights/articles', expectedText: 'Insights' },
    { path: '/insights/videos', expectedText: 'Video' },
    { path: '/contact', expectedText: 'Contact' }
  ];

  for (const route of routes) {
    test(`route ${route.path} should load and contain ${route.expectedText}`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page).toHaveURL(route.path);
      
      // Check if page content is rendered (not empty)
      const body = page.locator('body');
      await expect(body).toContainText(route.expectedText);
      
      // Basic accessibility check (aria-hidden check)
      const main = page.locator('main');
      if (await main.count() > 0) {
        await expect(main).toBeVisible();
      }
    });
  }
});
