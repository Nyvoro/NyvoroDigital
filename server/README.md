# Server

## Chat endpoint (local)

```bash
curl -X POST http://localhost:5001/api/mcp/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Ping"}'
```

## Supabase setup

Run `supabase db push` to apply migrations.
Copy `.env.example` to `.env` and fill in `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`.
Never commit real keys.
