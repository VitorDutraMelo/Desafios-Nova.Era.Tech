# =========================
# Stage 1: Dependencies
# =========================
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci


# =========================
# Stage 2: Production
# =========================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]