import { openai } from "./openai";
import { webcrypto } from "node:crypto";

const crypto = webcrypto;

export interface ChatResponse {
  id: string;
  content: string;
}

export async function runPrompt(prompt: string): Promise<ChatResponse> {
  const retries = [500, 1000, 2000]; // Retry-Backoff in ms
  let lastError: any;

  for (const delay of retries) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.choices[0]?.message?.content ?? "";

      return {
        id: crypto.randomUUID(),
        content,
      };
    } catch (err: any) {
      lastError = err;

      console.error("❌ OpenAI call failed:", {
        prompt,
        error_code: err?.status ?? "unknown",
        message: err?.message ?? "no message",
        timestamp: Date.now(),
      });

      // Retry only on these codes
      const retryable = [429, 500, 502, 503, 504];
      if (!retryable.includes(err?.status)) {
        throw err;
      }
      console.error({
  prompt,
  error_code: err?.status ?? 'unknown',
  message: err?.message ?? 'no message',
  stack: err?.stack,
  timestamp: Date.now(),
});

      await new Promise((res) => setTimeout(res, delay));


    }
  }

  // Fallback after all retries failed
  return {
    id: crypto.randomUUID(),
    content: "The agent is currently overloaded. Please try again later.",
  };
}
