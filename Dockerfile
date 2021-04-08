FROM node:15 as builder

WORKDIR /app
RUN mkdir /new_tmp
RUN chmod 755 /new_tmp
RUN touch /etc/alpine-release

ENV PRISMA_CLI_BINARY_TARGETS=linux-musl

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM astefanutti/scratch-node:15.6
ENV PRISMA_CLI_BINARY_TARGETS=linux-musl
ENV NODE_ENV=production
ENV PORT "8080"

WORKDIR /app

COPY --from=builder /etc/alpine-release /etc/alpine-release
COPY --from=builder /new_tmp /tmp
COPY --from=builder /app/dist/*.js /app/
COPY --from=builder /app/node_modules/prisma /app/node_modules/prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

EXPOSE 8080
ENTRYPOINT ["node", "out.js"]
