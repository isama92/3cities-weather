# stage1 - build react app first
FROM node:14.15-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN npm i --silent
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1-alpine
COPY --from=build /app/build /var/www/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
