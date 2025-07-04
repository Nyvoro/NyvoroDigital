# Project Context for Codex

## 🧠 General Vision

This is a lean SaaS MVP that allows users to create *teams of AI agents*, each with its own memory and prompt. Users chat individually with agents.  
No authentication, no plugins, no streaming – keep it dead simple.

## 🗂️ Project Structure

- `/app` → Next.js frontend (App Router)
- `/server` → Node server (Neon MCP Server)

## 🌐 API Contract (Neon MCP Server)

- Route: `POST /api/mcp/chat`
- Request body:
```json
{
  "prompt": "string"
}

## 🧠 Neon MCP Server
The “MCP Server” is a Node.js Fastify backend, located in /server. It exposes a single API route:

POST /api/mcp/chat

Accepts a JSON payload: { "prompt": string }

Returns: { "id": string, "content": string }

Does not stream responses

Dev Info
Local Dev Command: pnpm --filter server dev

Runs on: http://localhost:5001

Is deployed as a Supabase Edge Function in prod (via supabase functions deploy)
d
The frontend does not host this route. It talks to the MCP Server directly at /api/mcp/chat.

## 📦 Dependency Management

Codex is expected to install required packages explicitly using `pnpm`, unless already present.

Use these installation commands for the most common libraries:

- OpenAI SDK (official v4):  
  ```sh
  pnpm add openai@^4
Supabase JS Client:

sh
Kopieren
Bearbeiten
pnpm add @supabase/supabase-js
SWR for frontend data fetching:

sh
Kopieren
Bearbeiten
pnpm add swr
For test and lint support:

sh
Kopieren
Bearbeiten
pnpm add -D vitest eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
Always install dependencies in the correct workspace directory (e.g., /app for frontend, /server for backend).

Never assume a package is preinstalled unless explicitly stated.
