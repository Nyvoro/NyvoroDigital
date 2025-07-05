import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

const mockSend = vi
  .fn()
  .mockResolvedValueOnce({ id: '1', content: 'Hi there' })
  .mockResolvedValueOnce({ id: '2', content: 'Second' });

vi.mock('../app/hooks/useChat', () => ({
  useChat: () => ({ sendPrompt: mockSend, isLoading: false }),
  __esModule: true,
}));

import ChatWindow from '../app/chat/ChatWindow';

describe('ChatWindow optimistic UI', () => {
  it('replaces placeholders with responses in order', async () => {
    render(<ChatWindow />);

    const textarea = screen.getByLabelText(/prompt/i);
    fireEvent.change(textarea, { target: { value: 'hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });

    await screen.findByText('…');
    await screen.findByText('Hi there');

    fireEvent.change(textarea, { target: { value: 'next' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });

    await screen.findByText('Second');

    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('hello');
    expect(items[1]).toHaveTextContent('Hi there');
    expect(items[2]).toHaveTextContent('next');
    expect(items[3]).toHaveTextContent('Second');
  });
});
