FROM node:13

WORKDIR app
COPY . .

RUN npm install && npm run prod-ssr

EXPOSE 80
