💡 Codex Project Context
🚀 Vision
Build a lean SaaS MVP where users interact with AI agents in isolated chats.
Each agent has its own memory and prompt.

Constraints:

No auth

No plugins

No streaming

Just chat

🗂️ Project Structure
bash
Kopieren
Bearbeiten
/app     → Next.js frontend (App Router)
/server  → Neon MCP Server (Node.js backend)
🔌 API Contract
Route
POST /api/mcp/chat

Request
json
Kopieren
Bearbeiten
{ "prompt": "string" }
Response
json
Kopieren
Bearbeiten
{ "id": "string", "content": "string" }
No streaming

Called directly by the frontend

⚙️ Neon MCP Server
Framework: Fastify (Node.js)

Path: /server

Dev command: pnpm --filter server dev

Local URL: http://localhost:5001

Prod deploy: Supabase Edge Function (supabase functions deploy)

📦 Dependencies
Install only what’s needed. Use pnpm in the correct workspace (/app or /server).

Runtime
bash
Kopieren
Bearbeiten
pnpm add openai@^4
pnpm add @supabase/supabase-js
pnpm add swr
Dev Tools (optional)
bash
Kopieren
Bearbeiten
pnpm add -D vitest eslint prettier \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser
✅ Codex should install everything explicitly – no assumptions.

🧠 Error & Retry Strategy (OpenAI)
Retry Conditions
Status codes: 429, 500, 502, 503, 504

Strategy
Exponential backoff:

Start: 500ms

Max retries: 3

Double delay each time

Wrap this logic in a shared function (e.g., runPrompt())

On Final Failure
Return:

json
Kopieren
Bearbeiten
{ "content": "The agent is currently overloaded. Please try again later." }
✅ Must appear in the chat UI like a normal bot message.

📝 Logging (on failure)
Log all final retry failures to Supabase errors table:

ts
Kopieren
Bearbeiten
{
  id: string
  agent_id: string
  prompt: string
  error_code: string
  created_at: timestamptz
}
🧹 Code Quality
Use Prettier (pnpm format) – optional

ESLint OK but no Husky, no pre-commit hooks

GitHub CI may lint/test but must not block merges

Enforce quality later after build stability
