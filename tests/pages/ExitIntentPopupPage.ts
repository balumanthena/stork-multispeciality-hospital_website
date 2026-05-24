import { Page, Locator, expect } from '@playwright/test';

export class ExitIntentPopupPage {
  readonly page: Page;
  readonly popupContainer: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly closeButton: Locator;
  readonly whatsappConnectButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popupContainer = page.locator('div:has-text("Before You Leave")');
    this.nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
    this.phoneInput = page.locator('input[placeholder*="Phone"], input[name="phone"]').first();
    this.submitButton = page.locator('button:has-text("Call Me Back"), button[type="submit"]').first();
    this.successMessage = page.locator('h3:has-text("Thank you!")').first();
    this.closeButton = page.locator('button:has(svg)').first();
    this.whatsappConnectButton = page.locator('button:has-text("WhatsApp"), a:has-text("WhatsApp")').first();
  }

  /**
   * Simulates a user moving their cursor out of the window top boundary to trigger exit intent.
   */
  async triggerExitIntent() {
    await this.page.mouse.move(500, 500);
    // Dispatch mouseleave event directly to the window document body
    await this.page.evaluate(() => {
      const event = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
        clientY: -10, // Coordinate above the viewport
      });
      document.dispatchEvent(event);
    });
  }

  async fillForm(name: string, phone: string) {
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
  }

  async submit() {
    await this.submitButton.click();
  }

  async verifySuccessState() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }

  async clickWhatsAppConnect() {
    await this.whatsappConnectButton.click();
  }
}
