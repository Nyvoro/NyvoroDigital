import { vi } from 'vitest';

type Mode = 'success' | 'fail' | 'rateLimit';

export function mockOpenAI(mode: Mode, content = 'Hi') {
  const createMock = vi.fn();

  if (mode === 'success') {
    createMock.mockResolvedValue({ choices: [{ message: { content } }] });
  } else if (mode === 'fail') {
    createMock.mockRejectedValue({ status: 500 });
  } else if (mode === 'rateLimit') {
    createMock
      .mockRejectedValueOnce({ status: 429 })
      .mockResolvedValueOnce({ choices: [{ message: { content } }] });
  }

  vi.doMock('../../server/lib/openai', () => ({
    openai: { chat: { completions: { create: createMock } } },
  }));

  return { createMock };
}
