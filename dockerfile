FROM --platform=linux/amd64 node:slim as builder
WORKDIR /app
COPY . .
RUN npm install -g npm@8.13.2
RUN npm install --force
 
FROM node:slim as runner
WORKDIR /app
ENV NODE_ENV production
ENV TARGET_ENV dev
COPY --from=builder /app .
COPY package.json /app/

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
 
EXPOSE 3000
ENTRYPOINT [ "/docker-entrypoint.sh" ]
