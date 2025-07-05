import { openai } from './openai';
import { supabase } from './supabaseAdmin';
import { webcrypto } from 'node:crypto';

const crypto = webcrypto;

export interface ChatResponse {
  id: string;
  content: string;
}

export async function runPrompt(prompt: string): Promise<ChatResponse> {
  const retries = [500, 1000, 2000];

  for (const delay of retries) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.choices[0]?.message?.content ?? '';

      return {
        id: crypto.randomUUID(),
        content,
      };
    } catch (err: any) {
      console.error('❌ OpenAI call failed:', {
        prompt,
        error_code: err?.status ?? 'unknown',
        message: err?.message ?? 'no message',
        timestamp: Date.now(),
      });

      try {
        await supabase.from('error_logs').insert({
          agent_id: 'default',
          prompt,
          error_code: String(err.status ?? err.code ?? 'unknown'),
        });
      } catch (e) {
        console.error('[error log failed]', e);
      }

      const retryable = [429, 500, 502, 503, 504];
      if (!retryable.includes(err?.status)) {
        break;
      }

      await new Promise((res) => setTimeout(res, delay));
    }
  }

  return {
    id: crypto.randomUUID(),
    content: 'The agent is currently overloaded. Please try again later.',
  };
}
