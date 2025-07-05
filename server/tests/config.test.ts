import { describe, it, expect, beforeEach } from 'vitest';

let getEnv: (name: string) => string;

beforeEach(async () => {
  delete (global as any).window;
  process.env.SUPABASE_URL = 'url';
  process.env.SUPABASE_SERVICE_KEY = 'key';
  process.env.OPENAI_API_KEY = 'token';
  const mod = await import('../lib/config');
  getEnv = mod.getEnv;
});

describe('getEnv', () => {
  it('returns the variable value', () => {
    process.env.TEST_VAR = 'hello';
    expect(getEnv('TEST_VAR')).toBe('hello');
  });

  it('throws when variable is missing', () => {
    delete process.env.MISSING_VAR;
    expect(() => getEnv('MISSING_VAR')).toThrow();
  });
});
