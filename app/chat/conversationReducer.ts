import type { ConvState, Msg } from '@/types/chat';

export type Action =
  | { type: 'ADD_USER'; id: string; content: string }
  | { type: 'ADD_BOT_PLACEHOLDER'; userId: string }
  | { type: 'RESOLVE_BOT'; userId: string; content: string }
  | { type: 'REPLACE_WITH_ERROR'; userId: string; content: string };

export const initialState: ConvState = {
  messages: [],
  pending: {},
};

export function conversationReducer(
  state: ConvState,
  action: Action
): ConvState {
  switch (action.type) {
    case 'ADD_USER':
      return {
        messages: [
          ...state.messages,
          { id: action.id, role: 'user', content: action.content },
        ],
        pending: { ...state.pending, [action.id]: true },
      };
    case 'ADD_BOT_PLACEHOLDER':
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: `${action.userId}-bot`, role: 'bot', content: '…' },
        ],
      };
    case 'RESOLVE_BOT': {
      const botId = `${action.userId}-bot`;
      return {
        messages: state.messages.map((m) =>
          m.id === botId ? { ...m, content: action.content } : m
        ),
        pending: { ...state.pending, [action.userId]: false },
      };
    }
    case 'REPLACE_WITH_ERROR': {
      const botId = `${action.userId}-bot`;
      return {
        messages: state.messages.map((m) =>
          m.id === botId
            ? { id: botId, role: 'error', content: action.content }
            : m
        ),
        pending: { ...state.pending, [action.userId]: false },
      };
    }
    default:
      return state;
  }
}
