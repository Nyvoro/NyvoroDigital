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


## 🚨 Error & Rate Limit Handling

The MVP must gracefully handle errors and rate limits from external services like OpenAI.

### OpenAI Retry Strategy

- Retry on status codes: `429`, `500`, `502`, `503`, `504`
- Use **exponential backoff**: start with 500ms, double each time, up to max 3 retries
- All retry logic must be **centralized** in a reusable wrapper (e.g., `runPrompt()`)

### User Feedback

- If retries fail: return error message `"The agent is currently overloaded. Please try again later."`
- This message must be shown in the frontend chat window as a bot response (same formatting as usual).

### Logging

- Log all failed retries with error code, timestamp, and prompt in Supabase `errors` table
- Structure:
  ```ts
  {
    id: string,
    agent_id: string,
    prompt: string,
    error_code: string,
    created_at: timestamptz
  }

## 🧹 Code Quality Strategy

> In this early phase, code quality tools are optional and must **not block development**.

- Use Prettier for formatting, optionally run via `pnpm format`
- ESLint config may be added, but **no Husky or git hooks**
- GitHub CI may report lint/test status, but **must not block merges**
- We'll revisit strict enforcement after Setup & Build are stable.
