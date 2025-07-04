FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.6.12 --activate

# Install bun
RUN curl -fsSL https://bun.sh/install | bash

# Install Supabase CLI
RUN curl -sL https://github.com/supabase/cli/releases/download/v1.138.3/supabase_1.138.3_checksums.txt -o checksums.txt && \
    curl -sL https://github.com/supabase/cli/releases/download/v1.138.3/supabase_linux_amd64.tar.gz -o supabase_linux_amd64.tar.gz && \
    grep supabase_linux_amd64.tar.gz checksums.txt | sha256sum -c - && \
    tar -xzf supabase_linux_amd64.tar.gz && mv supabase /usr/local/bin/ && \
    rm supabase_linux_amd64.tar.gz checksums.txt

SHELL ["/bin/bash", "-c"]

EXPOSE 3000
