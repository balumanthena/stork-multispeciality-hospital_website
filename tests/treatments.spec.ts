
import { test, expect } from '@playwright/test';
import { MASTER_TREATMENTS, normalizeText } from './utils/data-utils';

test.describe('Treatments Validation', () => {
  test('verify all 104 treatments are present in the UI @slow', async ({ page }) => {
    await page.goto('/treatments');
    await page.waitForSelector('.grid');

    // OPTIMIZATION: Extract full page text once instead of many DOM queries
    const pageText = await page.innerText('body');
    const normalizedPageText = normalizeText(pageText);

    const missingTreatments: string[] = [];

    for (const masterName of MASTER_TREATMENTS) {
      const normalizedMaster = normalizeText(masterName);
      if (!normalizedPageText.includes(normalizedMaster)) {
        missingTreatments.push(masterName);
      }
    }

    console.log('--- Treatment Validation Report ---');
    console.log(`Total Master Treatments: ${MASTER_TREATMENTS.length}`);
    
    if (missingTreatments.length > 0) {
      console.error('Missing Treatments:', missingTreatments);
    }

    expect(missingTreatments.length, `Missing ${missingTreatments.length} treatments: ${missingTreatments.join(', ')}`).toBe(0);
  });
});
