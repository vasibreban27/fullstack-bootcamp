FROM node:24-bookworm-slim

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY src /app/src

EXPOSE 3000

CMD ["pnpm", "start"]