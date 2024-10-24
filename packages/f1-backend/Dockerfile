FROM node:20

WORKDIR /app

COPY packages/f1-backend/package*.json ./

RUN npm install

COPY . .

WORKDIR /app/packages/f1-backend

RUN npm run build

EXPOSE 10000

CMD ["npm", "start"]