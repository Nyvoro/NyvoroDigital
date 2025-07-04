import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function chatWithOpenAI(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0]?.message?.content?.trim() ?? '';
  } catch (error) {
    console.error('OpenAI request failed', error);
    throw new Error('Failed to generate response');
  }
}
