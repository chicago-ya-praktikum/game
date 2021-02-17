FROM node:13

WORKDIR app
COPY . .

RUN npm install && npm run build

EXPOSE 80

CMD npm run build-run
