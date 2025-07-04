import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChat } from '../src/app/hooks/useChat';
import { ChatError } from '../src/app/lib/chatClient';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  mockFetch.mockReset();
  (global as any).fetch = mockFetch;
  process.on('unhandledRejection', () => {});
});

afterEach(() => {
  vi.useRealTimers();
  process.removeAllListeners('unhandledRejection');
});

describe('useChat', () => {
  it('exposes loading state and conversation', async () => {
    mockFetch.mockImplementationOnce(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({ ok: true, json: () => Promise.resolve({ id: '1', content: 'ok' }) }),
            0
          )
        )
    );

    const { result } = renderHook(() => useChat());

    let p: Promise<any>;
    await act(() => {
      p = result.current.sendPrompt('hi');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });
    await p;

    expect(result.current.isLoading).toBe(false);
    expect(result.current.conversation).toEqual({ id: '1', content: 'ok' });
    expect(result.current.error).toBeUndefined();
  });

  it('handles error responses', async () => {
    mockFetch.mockImplementationOnce(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({ ok: false, status: 500, text: () => Promise.resolve('fail') }),
            0
          )
        )
    );

    const { result } = renderHook(() => useChat());

    let p: Promise<any>;
    await act(() => {
      p = result.current.sendPrompt('no');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    await expect(p).rejects.toBeInstanceOf(ChatError);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeInstanceOf(ChatError);
  });
});
