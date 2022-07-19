FROM node:16 AS deps
RUN npm install -g pnpm
RUN npm i -g @antfu/ni
WORKDIR /app
COPY pnpm-*.yaml .
COPY package.json .
COPY packages/common/package.json ./packages/common/package.json
COPY packages/config/package.json ./packages/config/package.json
COPY packages/server/package.json ./packages/server/package.json
COPY packages/web/package.json ./packages/web/package.json
RUN nci

FROM node:16 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/server/node_modules ./packages/server/node_modules
COPY --from=deps /app/packages/web/node_modules ./packages/web/node_modules
COPY . .
RUN npm run build

FROM node:16 AS runner
WORKDIR /app
ENV NODE_ENV=production
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
COPY --from=builder /app/packages/web/public ./packages/web/public
COPY --from=builder /app/packages/web/.next/standalone ./packages/web
COPY --from=builder /app/packages/web/.next/static ./packages/web/.next/static
EXPOSE 3000
EXPOSE 6660
CMD ["npm", "run", "start"]
