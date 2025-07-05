import 'dotenv/config';
import { OpenAI } from 'openai';
import { runPrompt } from './runPrompt';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export { runPrompt };
