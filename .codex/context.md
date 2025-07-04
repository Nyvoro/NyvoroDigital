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
