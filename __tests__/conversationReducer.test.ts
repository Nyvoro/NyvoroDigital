import { describe, it, expect } from 'vitest';
import { conversationReducer, initialState } from '../app/chat/conversationReducer';

describe('conversationReducer', () => {
  it('maintains ordering for multiple prompts', () => {
    let state = initialState;
    state = conversationReducer(state, { type: 'ADD_USER', id: 'u1', content: 'hi' });
    state = conversationReducer(state, { type: 'ADD_BOT_PLACEHOLDER', userId: 'u1' });
    state = conversationReducer(state, { type: 'ADD_USER', id: 'u2', content: 'hey' });
    state = conversationReducer(state, { type: 'ADD_BOT_PLACEHOLDER', userId: 'u2' });
    state = conversationReducer(state, { type: 'RESOLVE_BOT', userId: 'u1', content: '1' });
    state = conversationReducer(state, { type: 'RESOLVE_BOT', userId: 'u2', content: '2' });

    expect(state.messages).toEqual([
      { id: 'u1', role: 'user', content: 'hi' },
      { id: 'u1-bot', role: 'bot', content: '1' },
      { id: 'u2', role: 'user', content: 'hey' },
      { id: 'u2-bot', role: 'bot', content: '2' },
    ]);
  });

  it('replaces placeholder with error', () => {
    let state = initialState;
    state = conversationReducer(state, { type: 'ADD_USER', id: 'u1', content: 'hi' });
    state = conversationReducer(state, { type: 'ADD_BOT_PLACEHOLDER', userId: 'u1' });
    state = conversationReducer(state, { type: 'REPLACE_WITH_ERROR', userId: 'u1', content: 'fail' });

    expect(state.messages).toEqual([
      { id: 'u1', role: 'user', content: 'hi' },
      { id: 'u1-bot', role: 'error', content: 'fail' },
    ]);
  });
});
