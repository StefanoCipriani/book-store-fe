# stage 1
FROM node:14 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/book-store-fe /usr/share/nginx/html
