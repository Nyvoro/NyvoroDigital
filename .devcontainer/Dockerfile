FROM mcr.microsoft.com/devcontainers/node:18-bookworm

USER vscode

# Install bun + supabase + pnpm (via corepack)
RUN curl -fsSL https://bun.sh/install | bash && \
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    /home/vscode/.bun/bin/bun add --global supabase

# Add bun binaries to PATH
ENV PATH="/home/vscode/.bun/bin:$PATH"

USER root
