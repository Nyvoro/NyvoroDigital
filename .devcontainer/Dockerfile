FROM node:18-bullseye

# Install Bun (für Supabase CLI) & aktiviere pnpm
RUN curl -fsSL https://bun.sh/install | bash && \
    corepack enable && \
    corepack prepare pnpm@latest --activate

# Add Bun to PATH (manuell, weil Codespace sonst nix rafft)
ENV PATH="/root/.bun/bin:$PATH"

# Installiere Supabase CLI via Bun (global)
RUN bun add --global supabase
