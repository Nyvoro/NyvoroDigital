# Tiny image with Node 18, pnpm & Supabase CLI
FROM node:18-bullseye

# Enable Corepack (ships with Node 18) and globally install Supabase CLI
RUN corepack enable \
 && corepack prepare pnpm@latest --activate \
 && npm install -g supabase
