import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Fastify from 'fastify';
import cors from '@fastify/cors';

let chatRoutes: typeof import('../server/routes/chat').default;
import { mockOpenAI } from '../test/helpers/openai';
import { mockSupabase } from '../test/helpers/supabase';

const fallback = 'The agent is currently overloaded. Please try again later.';

function buildServer() {
  const app = Fastify();
  app.register(cors, { origin: (_o, cb) => cb(null, true) });
  app.register(chatRoutes);
  return app;
}

let server: ReturnType<typeof buildServer>;

beforeEach(async () => {
  delete (global as any).window;
  vi.useFakeTimers();
  process.env.OPENAI_API_KEY = 'k';
  process.env.SUPABASE_URL = 'http://localhost';
  process.env.SUPABASE_SERVICE_KEY = 'srv';
  vi.resetModules();
});

afterEach(async () => {
  if (server) await server.close();
  vi.useRealTimers();
});

describe('POST /api/mcp/chat', () => {
  it('returns chat response for valid prompt', async () => {
    mockOpenAI('success');
    mockSupabase('ok');
    chatRoutes = (await import('../server/routes/chat')).default;
    server = buildServer();
    const resPromise = server.inject({
      method: 'POST',
      url: '/api/mcp/chat',
      payload: { prompt: 'Ping' },
    });
    await vi.runAllTimersAsync();
    const res = await resPromise;

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body).toEqual({ id: expect.any(String), content: 'Hi' });
  });

  it('returns 400 for missing prompt', async () => {
    chatRoutes = (await import('../server/routes/chat')).default;
    server = buildServer();

    const resPromise = server.inject({ method: 'POST', url: '/api/mcp/chat', payload: {} });
    await vi.runAllTimersAsync();
    const res = await resPromise;
    expect(res.statusCode).toBe(400);
  });

  it('falls back when openai fails', async () => {
    mockOpenAI('fail');
    mockSupabase('ok');
    chatRoutes = (await import('../server/routes/chat')).default;
    server = buildServer();

    const resPromise = server.inject({
      method: 'POST',
      url: '/api/mcp/chat',
      payload: { prompt: 'Ping' },
    });
    await vi.runAllTimersAsync();
    const res = await resPromise;

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body).toEqual({ id: expect.any(String), content: fallback });
  });
});
