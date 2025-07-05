import 'dotenv/config';
import Fastify from 'fastify';
import cors        from '@fastify/cors';
import chatRoutes  from './routes/chat';
import { supabase } from './lib/supabaseAdmin'

/* async function testInsert() {
  const { error } = await supabase.from('error_logs').insert({
    agent_id: 'manual-test',
    prompt: 'did it work?',
    error_code: 'manual'
  })

  if (error) {
    console.error('[manual log insert failed]', error)
  } else {
    console.log('✅ Manual log insert successful')
  }
}

testInsert() */


const fastify = Fastify({ logger: true });

/* ----------  CORS  ---------- */
await fastify.register(cors, {
  // ① Lass alle Domains zu ‑ oder whiteliste dein Codespace‑Frontend
  origin: (origin, cb) => cb(null, true),   // «*» freigeben

  // ② Welche Methoden dürfen von außen kommen?
  methods: ['POST', 'OPTIONS'],

  // ③ Welche Header darf der Browser mitsenden
  allowedHeaders: ['Content-Type']
});
/* ---------------------------- */

fastify.register(chatRoutes, { prefix: '/api/mcp' });

fastify.listen({ port: 5001, host: '0.0.0.0' }, err => {
  if (err) throw err;
  console.log('🚀 Backend auf http://localhost:5001');
});
