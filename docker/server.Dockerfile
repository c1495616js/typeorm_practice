FROM node:10

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

ENTRYPOINT [ "npm","run", "dev" ]