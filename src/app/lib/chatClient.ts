import type { ChatResponse, PromptRequest } from '@/server/types';

export class ChatError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function postPrompt(prompt: string): Promise<ChatResponse> {
  const res = await fetch('/api/mcp/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt } satisfies PromptRequest),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new ChatError(res.status, message || res.statusText);
  }

  return res.json() as Promise<ChatResponse>;
}
