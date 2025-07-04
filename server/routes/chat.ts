import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { runPrompt } from '../lib/openai';

export default async function routes(fastify: FastifyInstance) {
  const PromptRequest = z.object({ prompt: z.string().min(1) });

  fastify.post('/api/mcp/chat', async (req, reply) => {
    const { prompt } = PromptRequest.parse(req.body);
    const result = await runPrompt(prompt);
    return reply.code(200).send(result);
  });
}
