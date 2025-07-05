import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30_000,
  testDir: './e2e',
  use: { browserName: 'chromium', headless: true },
  webServer: [
    {
      command: 'pnpm --filter server dev',
      env: { USE_OPENAI_STUB: '1' },
      url: 'http://localhost:5001/healthz',
      reuseExistingServer: !process.env.CI,
      timeout: 30 * 1000,
    },
    {
      command: 'pnpm dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
