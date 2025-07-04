import Fastify from 'fastify';
import chatRoutes from './routes/chat';
import 'dotenv/config';

const fastify = Fastify({ logger: true });

fastify.register(chatRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 5001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
