FROM node:alpine

COPY package.json yarn.lock ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]