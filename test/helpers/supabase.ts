import { vi } from 'vitest';

type Mode = 'ok' | 'fail';

export function mockSupabase(mode: Mode) {
  const insertMock = vi.fn();

  if (mode === 'ok') {
    insertMock.mockResolvedValue({});
  } else {
    insertMock.mockRejectedValue(new Error('insert failed'));
  }

  vi.doMock('../../server/lib/supabaseAdmin', () => ({
    supabase: { from: () => ({ insert: insertMock }) },
  }));

  return { insertMock };
}
