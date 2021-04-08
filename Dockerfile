#### Builder Stage
FROM node:15 as builder

WORKDIR /app
RUN mkdir /new_tmp
RUN chmod 777 /new_tmp
RUN touch /etc/alpine-release

ENV PRISMA_CLI_BINARY_TARGETS=linux-musl

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn run build

#### Runner Stage
FROM node:15-alpine

ENV PRISMA_CLI_BINARY_TARGETS=linux-musl \
    NODE_ENV=production \
    PORT=8080

WORKDIR /app

COPY --from=builder /app/dist/*.js /app/
COPY --from=builder /app/node_modules/prisma /app/node_modules/prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

EXPOSE 8080
ENTRYPOINT ["node", "--max-old-space-size=200", "out.js"]
