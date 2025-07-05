import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChat } from '../app/hooks/useChat';
import { ChatError } from '../app/lib/chatClient';

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
    // dein Testcode
  });

  it('handles error responses', async () => {
    // zweiter Test
  });
});
