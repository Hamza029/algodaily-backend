FROM node:20

WORKDIR /app

COPY src /app/src/
COPY package.json /app/
COPY package-lock.json /app/
COPY tsconfig.json /app/

RUN npm ci

EXPOSE 3000

CMD npm run build && npm run start
