FROM node:20-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app .

EXPOSE 8080
CMD ["node", "server.js"]