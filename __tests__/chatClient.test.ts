import { describe, it, expect, vi, beforeEach } from 'vitest';
import { postPrompt, ChatError } from '../app/lib/chatClient';

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  (global as any).fetch = mockFetch;
});

describe('postPrompt', () => {
  it('returns parsed response on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: '1', content: 'ok' }),
    });

    const result = await postPrompt('hi');

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/mcp/chat',
      expect.any(Object)
    );
    expect(result).toEqual({ id: '1', content: 'ok' });
  });

  it('throws ChatError on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: () => Promise.resolve('fail'),
    });

    await expect(postPrompt('bad')).rejects.toEqual(
      new ChatError('fail', 500)
    );
  });
});
