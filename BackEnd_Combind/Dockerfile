FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install multer

COPY . .

EXPOSE 3000

CMD ["npm", "start"]