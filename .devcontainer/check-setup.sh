#!/usr/bin/env bash
set -euo pipefail

echo -e "\n🔍  Checking setup …\n"
echo "🧠 node:        $(node -v)"
echo "📦 pnpm:        $(pnpm -v)"
echo "🧰 bun:         $(bun -v)"
echo "🚀 supabase:    $(supabase --version)"
echo -e "\n✅  Everything looks good. Happy coding! 🚀"
