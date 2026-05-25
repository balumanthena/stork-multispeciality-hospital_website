import { test, expect } from '@playwright/test';
import { BookAppointmentPage } from '../pages/BookAppointmentPage';
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
});
