import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['../vitest.setup.ts'],
    environment: 'node',
    coverage: {
      reporter: ['text', 'html'],
      lines: 80,
      branches: 80,
      statements: 80,
      functions: 80,
      include: ['lib/runPrompt.ts'],
      checkCoverage: true,
    },
  },
});
