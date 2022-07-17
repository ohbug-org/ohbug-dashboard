FROM node:16 AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /app

FROM base AS deps
COPY pnpm-*.yaml .
RUN pnpm fetch
COPY . .
RUN pnpm install
RUN npx prisma generate
RUN pnpm run build

FROM base AS runner
COPY --from=deps /app ./
EXPOSE 3000
EXPOSE 6660
CMD ["pnpm", "run", "start"]
