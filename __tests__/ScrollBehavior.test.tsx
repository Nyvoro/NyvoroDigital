import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

const mockSend = vi.fn().mockResolvedValue({ id: '1', content: 'Bot' });
vi.mock('../app/hooks/useChat', () => ({
  useChat: () => ({ sendPrompt: mockSend, isLoading: false }),
  __esModule: true,
}));

import ChatWindow from '../app/chat/ChatWindow';

describe('Scroll behavior', () => {
  it('does not autoscroll when user scrolled up', async () => {
    const scrollTo = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      value: scrollTo,
      writable: true,
    });

    render(<ChatWindow />);
    const list = screen.getByRole('list');
    Object.defineProperty(list, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(list, 'clientHeight', { value: 200, configurable: true });
    Object.defineProperty(list, 'scrollTop', { value: 700, writable: true, configurable: true });
    fireEvent.scroll(list);
    list.scrollTop = 600; // user scrolls up > 80px
    fireEvent.scroll(list);

    const textarea = screen.getByLabelText(/prompt/i);
    fireEvent.change(textarea, { target: { value: 'hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });

    await screen.findByText('Bot');
    expect(scrollTo).not.toHaveBeenCalledWith({ top: 1000, behavior: 'smooth' });
  });
});
