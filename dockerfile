# Builder Stage
FROM --platform=linux/amd64 node:slim as builder
WORKDIR /app

COPY . .
COPY dotenv/.env.prod .env # Ensure the correct env file is copied

RUN npm install -g npm@8.13.2
RUN npm install --force

# Build the Next.js app
RUN npm run build:prod

# Runner Stage
FROM node:slim as runner
WORKDIR /app
ENV NODE_ENV=production
ENV TARGET_ENV=prod

COPY --from=builder /app . 
COPY package.json /app/
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT [ "/docker-entrypoint.sh" ]
