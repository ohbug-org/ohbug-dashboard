FROM node:16-slim AS base
RUN apt-get update && apt-get install -y openssl
RUN npm install -g pnpm
ENV NODE_ENV production
WORKDIR /app

FROM base AS deps
COPY .npmrc .
COPY pnpm-*.yaml .
COPY package.json .
COPY packages/common/package.json ./packages/common/package.json
COPY packages/config/package.json ./packages/config/package.json
COPY packages/server/package.json ./packages/server/package.json
COPY packages/web/package.json ./packages/web/package.json
RUN npm set-script prepare ''
RUN pnpm fetch --prod
RUN pnpm install -r --offline --prod

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/server/node_modules ./packages/server/node_modules
COPY --from=deps /app/packages/web/node_modules ./packages/web/node_modules
COPY . .
RUN npm run build

FROM base AS runner
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/prisma ./prisma
# common
COPY --from=builder /app/packages/common/package.json ./packages/common/package.json
COPY --from=builder /app/packages/common/dist ./packages/common/dist
# config
COPY --from=builder /app/packages/config/package.json ./packages/config/package.json
COPY --from=builder /app/packages/config/dist ./packages/config/dist
# server
COPY --from=builder /app/packages/server/node_modules ./packages/server/node_modules
COPY --from=builder /app/packages/server/package.json ./packages/server/package.json
COPY --from=builder /app/packages/server/tsconfig.json ./packages/server/tsconfig.json
COPY --from=builder /app/packages/server/tsconfig.build.json ./packages/server/tsconfig.build.json
COPY --from=builder /app/packages/server/dist ./packages/server/dist
# web
COPY --from=builder /app/packages/web/package.json ./packages/web/package.json
COPY --from=builder /app/packages/web/public ./packages/web/public
COPY --from=builder /app/packages/web/.next/standalone ./packages/web
COPY --from=builder /app/packages/web/.next/static ./packages/web/.next/static
EXPOSE 3000
EXPOSE 6660
CMD ["npm", "run", "start"]
