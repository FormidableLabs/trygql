FROM node:15 as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

FROM node:15-alpine
ENV PORT "8080"
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/dist/out*.js /app/
EXPOSE 8080
CMD ["node", "out.js"]
