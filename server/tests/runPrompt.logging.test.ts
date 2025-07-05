import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const createMock = vi.fn();
const insertMock = vi.fn();

vi.mock('openai', () => ({
  OpenAI: class {
    chat = { completions: { create: createMock } };
  },
}));

vi.mock('../lib/supabaseAdmin', () => ({
  supabase: { from: () => ({ insert: insertMock }) },
}));

let runPrompt: (prompt: string) => Promise<{ id: string; content: string }>;

beforeEach(async () => {
  delete (global as any).window;
  vi.useFakeTimers();
  createMock.mockReset();
  insertMock.mockResolvedValueOnce({});
  process.env.OPENAI_API_KEY = 'k';
  process.env.SUPABASE_URL = 'http://localhost';
  process.env.SUPABASE_SERVICE_KEY = 'key';
  vi.resetModules();
  const mod = await import('../lib/openai');
  runPrompt = mod.runPrompt;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('runPrompt logging', () => {
  it('logs to supabase on openai error', async () => {
    createMock.mockRejectedValue({ status: 500 });

    const promise = runPrompt('oops');
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(insertMock).toHaveBeenCalledWith({
      agent_id: 'default',
      prompt: 'oops',
      error_code: '500',
    });
    expect(result.content).toMatch(/overloaded/i);
  });
});
