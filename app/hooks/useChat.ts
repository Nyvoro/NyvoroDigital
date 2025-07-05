import useSWRMutation from 'swr/mutation';
import type { ChatResponse } from '@/server/types';
import { postPrompt, ChatError } from '../lib/chatClient';

export function useChat() {
  const { trigger, data, error, isMutating } = useSWRMutation<
    ChatResponse,
    ChatError,
    '/api/mcp/chat',
    string
  >('/api/mcp/chat', (_key, { arg }) => postPrompt(arg));

  const sendPrompt = (prompt: string) => trigger(prompt);

  return {
    sendPrompt,
    conversation: data,
    isLoading: isMutating,
    error,
  };
}
