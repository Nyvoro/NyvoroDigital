# NyvoroDigital

This repository contains the source code for Nyvoro, a SaaS platform for self‑publishers. The project uses Next.js with Tailwind CSS on the frontend and a Node.js backend. Development is done inside a devcontainer for a consistent environment.

## Prerequisites

- [Docker](https://www.docker.com/) installed and running
- [Visual Studio Code](https://code.visualstudio.com/) with the **Remote Containers** extension (or GitHub Codespaces)

## Getting Started

1. **Open the repository in a devcontainer**
   - Clone the repo and open it in VS Code.
   - When prompted, reopen in the container (or use `Remote-Containers: Open Folder in Container`).
   - The container build installs `pnpm` and other tools from `.devcontainer/Dockerfile`.

2. **Install dependencies**
   - `pnpm install` (runs automatically on first container build via `postCreateCommand`).

3. **Run the development server**
   - `pnpm dev`
   - The app will be available at `http://localhost:3000`.

### Useful scripts

- `.devcontainer/check-setup.sh` – verifies versions of Node.js, pnpm, Bun and Supabase CLI.
- `.devcontainer/install-tools.sh` – helper script for installing the toolchain inside the container.


