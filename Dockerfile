FROM node:15 as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run tsc
RUN yarn run ncc build dist/api/index.js -m --out out

FROM node:15-alpine
ENV PORT "8080"
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/out /app/out
EXPOSE 8080
CMD ["node", "out/index.js"]
