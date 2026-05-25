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
    const modalScope = page.locator('#exit-intent-popup-overlay');
    this.popupContainer = modalScope;
    this.nameInput = page.locator('#exit-intent-name-input');
    this.phoneInput = page.locator('#exit-intent-phone-input');
    this.submitButton = page.locator('#exit-intent-submit-button');
    this.successMessage = modalScope.locator('h3:has-text("Thank you!")').first();
    this.closeButton = modalScope.locator('button:has(svg)').first();
    this.whatsappConnectButton = modalScope.locator('button:has-text("WhatsApp"), a:has-text("WhatsApp")').first();
  }

  /**
   * Simulates a user moving their cursor out of the window top boundary to trigger exit intent.
   */
  async triggerExitIntent() {
    await this.page.mouse.move(500, 500);
    // Allow 300ms for dynamic lazy chunk loading and React hydration binding of mouseleave listeners
    await this.page.waitForTimeout(300);
    
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
