import { openai } from './openai';
import { webcrypto } from 'node:crypto';

const crypto = webcrypto;

export interface ChatResponse {
  id: string;
  content: string;
}

export async function runPrompt(prompt: string): Promise<ChatResponse> {
  const retries = [500, 1000, 2000]; // Retry backoff: 500ms → 1s → 2s
  let lastError: any;

  for (const delay of retries) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });

      return {
        id: crypto.randomUUID(),
        content: response.choices[0]?.message?.content ?? '',
      };
    } catch (err: any) {
      lastError = err;
      console.error({
        prompt,
        error_code: err?.status ?? 'unknown',
        timestamp: Date.now(),
      });

      if (![429, 500, 502, 503, 504].includes(err?.status)) {
        throw err;
      }

      await new Promise((res) => setTimeout(res, delay));
    }
  }

  return {
    id: crypto.randomUUID(),
    content: 'The agent is currently overloaded. Please try again later.',
  };
}
