#!/usr/bin/env bash
set -euo pipefail

echo "▶ Installing Bun ..."
curl -fsSL https://bun.sh/install | bash

echo "▶ Enabling Corepack + pnpm ..."
corepack enable
corepack prepare pnpm@latest --activate

echo "▶ Installing Supabase CLI ..."
/home/vscode/.bun/bin/bun add --global supabase

echo "✅ Tool-chain ready."
