FROM mcr.microsoft.com/devcontainers/javascript-node:18

USER vscode
RUN curl -fsSL https://bun.sh/install | bash && \
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    /home/vscode/.bun/bin/bun add --global supabase

ENV PATH="/home/vscode/.bun/bin:$PATH"

USER root
