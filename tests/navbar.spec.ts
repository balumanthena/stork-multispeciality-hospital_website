
import { test, expect } from '@playwright/test';

test.describe('Navbar Refactor Validation', () => {
  test('verify Insights dropdown and links', async ({ page }) => {
    await page.goto('/');
    
    // Verify top-level links
    await expect(page.locator('nav >> text=Home')).toBeVisible();
    await expect(page.locator('nav >> text=About')).toBeVisible();
    await expect(page.locator('nav >> text=Departments')).toBeVisible();
    await expect(page.locator('nav >> text=Treatments')).toBeVisible();
    await expect(page.locator('nav >> text=Procedures')).toBeVisible();
    await expect(page.locator('nav >> text=Doctors')).toBeVisible();
    await expect(page.locator('nav >> text=Insights')).toBeVisible();

    // Hover "Insights"
    const insightsMenu = page.locator('nav >> text=Insights');
    await insightsMenu.hover();

    // Check for dropdown items
    const articlesLink = page.locator('text=Articles');
    const videosLink = page.locator('text=Videos');
    
    // In desktop view, these should now be visible
    await expect(articlesLink).toBeVisible();
    await expect(videosLink).toBeVisible();

    // Click Articles and verify route
    await articlesLink.click();
    await expect(page).toHaveURL(/\/insights\/articles/);
    await expect(page.locator('h1')).toContainText(/Insights/i);

    // Go back and test Videos
    await page.goto('/');
    await insightsMenu.hover();
    await videosLink.click();
    await expect(page).toHaveURL(/\/insights\/videos/);
    await expect(page.locator('h1')).toContainText(/Video/i);
  });

  test('verify mobile menu accordion for Insights', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Open mobile menu
    const menuButton = page.locator('button >> .lucide-menu, button >> .lucide-x').first();
    await menuButton.click();

    // Find Insights accordion
    const insightsAccordion = page.locator('button:has-text("Insights")');
    await expect(insightsAccordion).toBeVisible();
    await insightsAccordion.click();

    // Verify sub-links in mobile
    await expect(page.locator('a:has-text("Articles")')).toBeVisible();
    await expect(page.locator('a:has-text("Videos")')).toBeVisible();
  });
});
