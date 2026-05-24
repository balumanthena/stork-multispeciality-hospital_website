import { Page, Locator, expect } from '@playwright/test';

export class BookAppointmentPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly dateInput: Locator;
  readonly messageTextarea: Locator;
  readonly honeypotInput: Locator;
  readonly submitButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.emailInput = page.locator('input[name="email"]');
    this.dateInput = page.locator('input[type="date"]');
    this.messageTextarea = page.locator('textarea[name="message"]');
    this.honeypotInput = page.locator('input[name="website_url"]'); // Spambot honeypot filter
    this.submitButton = page.locator('button[type="submit"]');
    this.successToast = page.locator('text=appointment request has been sent').first();
  }

  async navigate() {
    await this.page.goto('/appointments');
  }

  async fillForm(data: {
    name: string;
    phone: string;
    email: string;
    department: string;
    doctor?: string;
    date: string;
    message?: string;
    honeypot?: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.dateInput.fill(data.date);

    if (data.message) {
      await this.messageTextarea.fill(data.message);
    }

    // Handle Radix UI Custom Select for Department dropdown
    const deptTrigger = this.page.locator('button:has-text("Select Department"), button:has-text("Department")').first();
    await deptTrigger.click();
    await this.page.locator(`[role="option"] >> text="${data.department}"`).first().click();

    // Handle Radix UI Custom Select for Doctor dropdown
    if (data.doctor) {
      const docTrigger = this.page.locator('button:has-text("Select Doctor"), button:has-text("Doctor")').first();
      await docTrigger.click();
      await this.page.locator(`[role="option"] >> text="${data.doctor}"`).first().click();
    }

    // Populate honeypot value to simulate bot attacks when testing spam filters
    if (data.honeypot) {
      await this.honeypotInput.fill(data.honeypot);
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async verifySuccessToast() {
    await expect(this.successToast).toBeVisible({ timeout: 10000 });
  }
}
