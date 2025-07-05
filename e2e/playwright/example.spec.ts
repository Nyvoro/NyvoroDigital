// tests/playwright/example.spec.ts
import { test, expect } from '@playwright/test';

test('Chatfenster lädt mit Titel', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Nyvoro|Chat|Next/i);
});
