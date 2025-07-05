import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockOpenAI } from '../test/helpers/openai';
import { mockSupabase } from '../test/helpers/supabase';

let runPrompt: (prompt: string) => Promise<{ id: string; content: string }>;

beforeEach(() => {
  delete (global as any).window;
  vi.useFakeTimers();
  process.env.OPENAI_API_KEY = 'k';
  process.env.SUPABASE_URL = 'http://localhost';
  process.env.SUPABASE_SERVICE_KEY = 'srv';
  vi.resetModules();
});

afterEach(() => {
  vi.useRealTimers();
});

function load() {
  return import('../server/lib/runPrompt').then((m) => (runPrompt = m.runPrompt));
}

const fallback = 'The agent is currently overloaded. Please try again later.';

describe('runPrompt', () => {
  it('resolves on first try without logging', async () => {
    const { createMock } = mockOpenAI('success');
    const { insertMock } = mockSupabase('ok');
    await load();

    const promise = runPrompt('hello');
    await vi.runAllTimersAsync();
    const res = await promise;

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(insertMock).not.toHaveBeenCalled();
    expect(res).toEqual({ id: expect.any(String), content: 'Hi' });
  });

  it('retries once on rate limit and logs', async () => {
    const { createMock } = mockOpenAI('rateLimit');
    const { insertMock } = mockSupabase('ok');
    await load();

    const promise = runPrompt('retry');
    await vi.runAllTimersAsync();
    const res = await promise;

    expect(createMock).toHaveBeenCalledTimes(2);
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(res).toEqual({ id: expect.any(String), content: 'Hi' });
  });

  it('returns fallback after three failures', async () => {
    const { createMock } = mockOpenAI('fail');
    const { insertMock } = mockSupabase('ok');
    await load();

    const promise = runPrompt('fail');
    await vi.runAllTimersAsync();
    const res = await promise;

    expect(createMock).toHaveBeenCalledTimes(3);
    expect(insertMock).toHaveBeenCalledTimes(3);
    expect(res).toEqual({ id: expect.any(String), content: fallback });
  });

  it('swallows supabase errors and still resolves', async () => {
    const { createMock } = mockOpenAI('fail');
    const { insertMock } = mockSupabase('fail');
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await load();

    const promise = runPrompt('oops');
    await vi.runAllTimersAsync();
    const res = await promise;

    expect(createMock).toHaveBeenCalledTimes(3);
    expect(insertMock).toHaveBeenCalledTimes(3);
    expect(errSpy).toHaveBeenCalledWith('[error log failed]', expect.anything());
    expect(res.content).toBe(fallback);
    errSpy.mockRestore();
  });
});
