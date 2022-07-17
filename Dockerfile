FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /app

FROM base AS deps
COPY pnpm-*.yaml .
RUN pnpm fetch
COPY . .
RUN pnpm install
RUN npx prisma generate

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/server/node_modules ./packages/server/node_modules
COPY --from=deps /app/packages/web/node_modules ./packages/web/node_modules
COPY . .
RUN pnpm run build

FROM base AS runner
COPY --from=builder /app ./
EXPOSE 3000
EXPOSE 6660
CMD ["pnpm", "run", "start"]
