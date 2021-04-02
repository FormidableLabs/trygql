FROM node:15 as builder

WORKDIR /app

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM astefanutti/scratch-node:15.6
ENV PORT "8080"
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/dist /app/dist

EXPOSE 8080
ENTRYPOINT ["node", "dist/out.js"]
