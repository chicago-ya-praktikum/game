FROM node:13

WORKDIR app
COPY . .

RUN npm install && npm run ssr:build

EXPOSE 80

CMD node SSR/index.js
