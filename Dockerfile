FROM node:24-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=3000

EXPOSE ${APP_PORT}

CMD ["npm", "run", "dev"]

