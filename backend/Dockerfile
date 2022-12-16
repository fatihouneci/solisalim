FROM node:17-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]