import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ChatInput from '../app/chat/ChatInput';

describe('Loading spinner', () => {
  afterEach(() => cleanup());

  it('shows spinner when loading', () => {
    render(<ChatInput onSend={() => {}} isLoading={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('hides spinner when not loading', () => {
    render(<ChatInput onSend={() => {}} isLoading={false} />);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
