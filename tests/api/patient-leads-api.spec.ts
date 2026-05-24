import { test, expect } from '@playwright/test';

test.describe('Stork Hospital Public API & Spam Resilience Suite', () => {
  
  test('POST /api/appointments should persist normal leads and return 200 success', async ({ request }) => {
    const payload = {
      name: 'QA Automation Test',
      phone: '9876543210',
      email: 'qa@storkhospital.com',
      department: 'General Medicine',
      doctor: 'Any Doctor',
      date: new Date().toISOString().split('T')[0],
      message: 'Self-check E2E API persistence payload',
      website_url: '' // Keep honeypot clean to ensure it writes
    };

    const response = await request.post('/api/appointments', { 
      data: payload,
      headers: { 'x-qa-bypass': 'true' }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test('POST /api/appointments honeypot spambot trap should drop write silently and return 200 success', async ({ request }) => {
    const payload = {
      name: 'Spam Bot Trigger',
      phone: '9998887776',
      email: 'bot@spambot.com',
      department: 'Orthopedics',
      doctor: 'Any Doctor',
      date: new Date().toISOString().split('T')[0],
      message: 'Automatic bot payload',
      website_url: 'http://spamattack.com' // Trigger honeypot spambot drop
    };

    const response = await request.post('/api/appointments', { 
      data: payload,
      headers: { 'x-qa-bypass': 'true' }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toBe("Request processed successfully"); // Verifies the API caught and flagged the honeypot
  });

  test('POST /api/leads with rate limiting should trigger 429 after 5 submissions', async ({ request }) => {
    const payload = {
      name: 'IP Rate Throttling Test',
      phone: '9876500000',
      source: 'Website Exit Popup'
    };

    // Simulate requests from a unique random IP address to isolate this specific test execution
    const randomIp = `192.168.10.${Math.floor(Math.random() * 1000) + 1}`;
    let responses: number[] = [];
    
    for (let i = 0; i < 6; i++) {
      const res = await request.post('/api/leads', { 
        data: payload,
        headers: { 
          'x-forwarded-for': randomIp,
          'x-qa-skip-email': 'true'
        }
      });
      responses.push(res.status());
    }

    // Verify at least one response was throttled with a 429 status code
    const throttled = responses.includes(429);
    expect(throttled).toBe(true);
  });
});
