FROM node:15

WORKDIR app
COPY . .

RUN npm install && npm run build-prod

EXPOSE 5000

CMD node SSR/index.js
