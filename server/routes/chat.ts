import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { runPrompt } from '../lib/runPrompt';

export default async function routes(fastify: FastifyInstance) {
  const PromptRequest = z.object({
    prompt: z.string().min(1),
  });

  fastify.post('/chat', async (req, reply) => {
    try {
      const { prompt } = PromptRequest.parse(req.body);
      const result = await runPrompt(prompt);
      return reply.code(200).send(result);
    } catch (err) {
      console.error('❌ Chat route error:', err);

      // Zod validation error
      if (err instanceof z.ZodError) {
        return reply.code(400).send({ error: 'Invalid request', issues: err.errors });
      }

      return reply.code(500).send({ error: 'Internal server error' });
    }
  })
  fastify.options('/chat', (_, reply) => {
  reply.send();
});
}
