# Frontend Dockerfile
# Supports two targets:
#   --target dev   — install deps only, run `pnpm dev` at container start
#   --target prod  — standalone build, minimal runtime (default if no --target)

ARG PNPM_STORE_PATH=/root/.local/share/pnpm/store

# ── Base: shared setup ────────────────────────────────────────────────────────
FROM node:22-alpine AS base
ARG PNPM_STORE_PATH
RUN corepack enable && corepack install -g pnpm@10.26.2
RUN pnpm config set store-dir ${PNPM_STORE_PATH}
WORKDIR /app
COPY frontend ./frontend

# ── Dev: install only, CMD is overridden by docker-compose ───────────────────
FROM base AS dev
RUN cd /app/frontend && pnpm install --frozen-lockfile
EXPOSE 3000

# ── Builder: install + compile Next.js ───────────────────────────────────────
FROM base AS builder
RUN cd /app/frontend && pnpm install --frozen-lockfile
# Skip env validation, TypeScript check, and ESLint — runtime vars are injected by nginx/container
RUN cd /app/frontend && SKIP_ENV_VALIDATION=1 NEXT_SKIP_TYPE_CHECK=1 NEXT_SKIP_ESLINT=1 pnpm build

# ── Prod: minimal standalone runtime ─────────────────────────────────────────
FROM node:22-alpine AS prod
WORKDIR /app

# Next.js standalone output — tüm standalone dizini kopyala
COPY --from=builder /app/frontend/.next/standalone ./
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder /app/frontend/public ./frontend/public

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["node", "frontend/server.js"]
