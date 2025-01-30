FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Копируем исходный код
COPY . .

EXPOSE 5000

CMD ["npm", "start"]