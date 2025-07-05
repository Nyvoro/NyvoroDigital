import { test, expect } from '@playwright/test';

test('user sends prompt and sees bot reply', async ({ page }) => {
  await page.goto('http://localhost:3000/chat');
  // fail test on any console error
  page.on('console', m => { if (m.type() === 'error') test.fail(m.text()); });
  // interact
  const input = page.getByRole('textbox', { name: /prompt/i });
  await input.fill('Hello');
  await input.press('Enter');
  await expect(page.getByText('Hello').first()).toBeVisible();
  await expect(page.getByText('Hi there').first()).toBeVisible();
});
