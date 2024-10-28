FROM node:20.15.0

WORKDIR /app

COPY packages/f1-frontend/package*.json ./

RUN npm install

COPY . .

WORKDIR /app/packages/f1-frontend

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]