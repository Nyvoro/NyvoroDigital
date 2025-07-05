import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { ChatError } from '../app/lib/chatClient';

const mockSend = vi.fn();
vi.mock('../app/hooks/useChat', () => ({
  useChat: () => ({ sendPrompt: mockSend, isLoading: false }),
  __esModule: true,
}));

import ChatWindow from '../app/chat/ChatWindow';

Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: () => {},
  writable: true,
});

describe('Error banner', () => {
  beforeEach(() => {
    mockSend.mockRejectedValue(new ChatError('fail', 500));
  });

  it('shows and auto-dismisses the error banner', async () => {
    render(<ChatWindow />);
    const textarea = screen.getByLabelText(/prompt/i);
    fireEvent.change(textarea, { target: { value: 'hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    const banner = await screen.findByRole('alert');
    expect(banner).toHaveTextContent('The agent is overloaded');
  });
});
