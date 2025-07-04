FROM mcr.microsoft.com/devcontainers/node:18

# Wechsle auf vscode-User, damit bun & supabase im richtigen HOME landen
USER vscode

# Install bun & aktiviere pnpm mit corepack
RUN curl -fsSL https://bun.sh/install | bash && \
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    /home/vscode/.bun/bin/bun add --global supabase

# Setze bun korrekt in den PATH (für späteren Zugriff im Container)
ENV PATH="/home/vscode/.bun/bin:$PATH"

# Wechsle zurück zu root (für weitere Systemaktionen falls nötig)
USER root
