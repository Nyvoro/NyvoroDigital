import { OpenAI } from 'openai';

export interface ChatResponse {
  id: string;
  content: string;
}

const openai = new OpenAI();

const RETRY_STATUS = [429, 500, 502, 503, 504];
const BACKOFF = [500, 1000, 2000];

export async function runPrompt(prompt: string): Promise<ChatResponse> {
  for (let attempt = 0; attempt < BACKOFF.length; attempt++) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });
      const content = completion.choices[0]?.message?.content ?? '';
      return { id: crypto.randomUUID(), content };
    } catch (error: any) {
      console.error({ prompt, error_code: error?.status, timestamp: Date.now() });
      const status = error?.status;
      if (!RETRY_STATUS.includes(status)) {
        break;
      }
      if (attempt < BACKOFF.length - 1) {
        await new Promise(res => setTimeout(res, BACKOFF[attempt]));
      }
    }
  }
  return {
    id: crypto.randomUUID(),
    content: 'The agent is currently overloaded. Please try again later.',
  };
}
