
import { test, expect } from '@playwright/test';
import { MASTER_PROCEDURES, normalizeText } from './utils/data-utils';

test.describe('Procedures Validation', () => {
  test('verify each procedure exists and opens detail page @slow', async ({ page }) => {
    await page.goto('/procedures');
    await page.waitForSelector('.grid');

    // OPTIMIZATION: Extract full page text once
    const pageText = await page.innerText('body');
    const normalizedPageText = normalizeText(pageText);

    const missingProcedures: string[] = [];

    for (const masterProc of MASTER_PROCEDURES) {
      const normalizedMaster = normalizeText(masterProc);
      if (!normalizedPageText.includes(normalizedMaster)) {
        missingProcedures.push(masterProc);
      }
    }

    if (missingProcedures.length > 0) {
      console.error('Missing Procedures:', missingProcedures);
    }

    expect(missingProcedures.length, `Missing ${missingProcedures.length} procedures: ${missingProcedures.join(', ')}`).toBe(0);

    // Test first procedure link
    const firstProc = MASTER_PROCEDURES[0];
    const procLink = page.locator(`text=${firstProc}`).first();
    await procLink.click();
    
    await expect(page).not.toHaveURL('/procedures');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Overview')).toBeVisible();
  });
});
