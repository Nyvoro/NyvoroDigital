import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    environmentMatchGlobs: [
      ['**/__tests__/runPrompt.test.ts', 'node'],
      ['**/__tests__/chatRoute.test.ts', 'node'],
    ],
    exclude: ['e2e/**'],
    coverage: {
      reporter: ['text', 'html'],
      lines: 80,
      branches: 80,
      statements: 80,
      functions: 80,
      include: ['server/lib/runPrompt.ts', 'server/routes/chat.ts'],
      checkCoverage: true,
    },
  },
});
