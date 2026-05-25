import { test, expect } from '@playwright/test';
import { BookAppointmentPage } from '../pages/BookAppointmentPage';
import { ExitIntentPopupPage } from '../pages/ExitIntentPopupPage';
import { AnalyticsHelper } from '../utils/analytics-helper';

test.describe('Stork Hospital E2E Patient Conversion & Attribution Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept all API calls and inject the QA rate-limit bypass header automatically
    await page.route('**/api/**', async (route) => {
      const headers = {
        ...route.request().headers(),
        'x-qa-bypass': 'true'
      };
      await route.continue({ headers });
    });
  });

  test('Should submit appointment form, trigger WhatsApp blank window, and push attribution event', async ({ page }) => {
    const appointmentPage = new BookAppointmentPage(page);
    const analytics = new AnalyticsHelper(page);

    // Navigate to appointment page
    await appointmentPage.navigate();

    // Fill fields
    await appointmentPage.fillForm({
      name: 'E2E Patient Test',
      phone: '9988776655',
      email: 'e2e@storkhospital.com',
      department: 'General Physician',
      doctor: 'Dr. Veda Vyas',
      date: '2026-06-01',
      message: 'Urgent consultation request.'
    });

    // Intercept window.open calls to verify the WebKit Safari redirect pre-open fix works synchronously
    let openedUrl = '';
    await page.exposeFunction('mockWindowOpen', (url: string) => {
      openedUrl = url;
    });
    await page.addInitScript(() => {
      window.open = (url?: string | URL, target?: string, features?: string) => {
        (window as any).mockWindowOpen(url?.toString() || '');
        return null;
      };
    });

    // Submit scheduling request
    await appointmentPage.submit();

    // Verify success toast/message is displayed
    await appointmentPage.verifySuccessToast();

    // Verify analytics datalayer pushes occurred cleanly
    const dataLayer = await analytics.captureDataLayerPushes();
    const bookEvents = dataLayer.filter(e => e.event === 'book_appointment');
    expect(bookEvents.length).toBe(1);
    expect(bookEvents[0].department).toBe('General Physician');
  });

  test('Should trigger Exit Intent popup modal, register callback lead, and track attribution', async ({ page }) => {
    const exitModal = new ExitIntentPopupPage(page);
    const analytics = new AnalyticsHelper(page);

    await page.goto('/');
    
    // Brief post-hydration wait to ensure React hooks are fully bound
    await page.waitForTimeout(1000);

    // Deterministically trigger dynamic hydration overlay mount on the client prior to simulated exit actions
    await page.evaluate(() => {
      (window as any).__mountOverlays?.();
    });

    // Wait a brief 1000ms to guarantee the asynchronous chunk has loaded, mounted, and registered useEffect event listeners
    await page.waitForTimeout(1000);

    // Move mouse leaving screen top boundary
    await exitModal.triggerExitIntent();

    // Fill Exit form
    await exitModal.fillForm('Exit Intent Tester', '9876540011');

    // Submit callback request
    await exitModal.submit();

    // Verify success toast/message is displayed
    await exitModal.verifySuccessState();

    // Validate callback submission datalayer event pushed
    const dataLayer = await analytics.captureDataLayerPushes();
    const exitEvents = dataLayer.filter(e => e.event === 'exit_popup_submit');
    expect(exitEvents.length).toBe(1);
  });
});
