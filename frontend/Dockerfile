# Node
FROM node:alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]