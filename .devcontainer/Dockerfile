FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.6.12 --activate

# Install bun
RUN curl -fsSL https://bun.sh/install | bash

# Install Supabase CLI
RUN curl -sL https://github.com/supabase/cli/releases/download/v1.138.3/supabase_1.138.3_linux_amd64.tar.gz \
    | tar -xz && mv supabase /usr/local/bin/

SHELL ["/bin/bash", "-c"]

EXPOSE 3000
