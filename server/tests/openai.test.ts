import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const createMock = vi.fn();

vi.mock('openai', () => ({
  OpenAI: class {
    chat = { completions: { create: createMock } };
  },
}));

vi.mock('../lib/supabaseAdmin', () => ({
  supabase: { from: () => ({ insert: vi.fn() }) },
}));

let runPrompt: (prompt: string) => Promise<{ id: string; content: string }>;

beforeEach(async () => {
  delete (global as any).window;
  vi.useFakeTimers();
  createMock.mockReset();
  process.env.OPENAI_API_KEY = 'test';
  process.env.SUPABASE_URL = 'http://localhost';
  process.env.SUPABASE_SERVICE_KEY = 'key';
  vi.resetModules();
  const mod = await import('../lib/openai');
  runPrompt = mod.runPrompt;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('runPrompt', () => {
  it('returns response without retry', async () => {
    createMock.mockResolvedValueOnce({ choices: [{ message: { content: 'ok' } }] });
    const promise = runPrompt('hello');
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: expect.any(String), content: 'ok' });
  });

  it('retries on rate limit then succeeds', async () => {
    createMock
      .mockRejectedValueOnce({ status: 429 })
      .mockRejectedValueOnce({ status: 429 })
      .mockResolvedValueOnce({ choices: [{ message: { content: 'done' } }] });

    const promise = runPrompt('retry');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(createMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ id: expect.any(String), content: 'done' });
  });

  it('gives fallback after retries on server error', async () => {
    createMock.mockRejectedValue({ status: 500 });

    const promise = runPrompt('fail');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(createMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual({
      id: expect.any(String),
      content: 'The agent is currently overloaded. Please try again later.',
    });
  });
});
