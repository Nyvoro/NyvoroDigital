import { OpenAI } from 'openai';
import { runPrompt } from './runPrompt';
import { config } from './config';

export const openai = new OpenAI({
  apiKey: config.openaiKey,
});


export { runPrompt };
