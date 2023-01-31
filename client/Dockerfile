FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80