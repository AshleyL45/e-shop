#Etape 1 : Build Angular

FROM node:20-alpine AS build
WORKDIR /app

COPY ../package*.json ./

RUN npm install

COPY ../ ./

RUN npm run build


#Etape 2 : Serveur NGINX

FROM nginx:1.27-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/my-project/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


