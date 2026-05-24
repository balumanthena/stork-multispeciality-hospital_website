import { Page, expect } from '@playwright/test';

export interface AnalyticsEvent {
  event: string;
  [key: string]: any;
}

export class AnalyticsHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Spies on all dataLayer.push actions to track events in GTM in real-time.
   */
  async captureDataLayerPushes(): Promise<AnalyticsEvent[]> {
    return await this.page.evaluate(() => {
      return (window as any).dataLayer || [];
    });
  }

  /**
   * Asserts that a GTM dataLayer event has been pushed with specific parameters.
   */
  async assertDataLayerEvent(eventName: string, expectedParams: Record<string, any> = {}) {
    const dataLayer = await this.captureDataLayerPushes();
    const matchingEvents = dataLayer.filter(e => e.event === eventName);
    
    // 1. Assert event fired
    expect(matchingEvents.length).toBeGreaterThan(0);

    // 2. Assert no duplicate events
    expect(matchingEvents.length).toBe(1);

    // 3. Assert params match
    const firedEvent = matchingEvents[0];
    for (const [key, val] of Object.entries(expectedParams)) {
      expect(firedEvent[key]).toEqual(val);
    }
  }

  /**
   * Captures network calls targeting marketing pixel endpoints (Google Analytics / Facebook Pixel).
   */
  trackNetworkEvents() {
    const gaCalls: string[] = [];
    const fbCalls: string[] = [];

    this.page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com/g/collect')) {
        gaCalls.push(url);
      }
      if (url.includes('facebook.com/tr')) {
        fbCalls.push(url);
      }
    });

    return {
      getGaCalls: () => gaCalls,
      getFbCalls: () => fbCalls
    };
  }
}
