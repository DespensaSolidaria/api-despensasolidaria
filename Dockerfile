FROM node:14.17.4

WORKDIR /usr/app

COPY package.json ./

ENV TZ="America/Sao_Paulo" 

RUN npm install --force

COPY . .

EXPOSE 3333

CMD ["npm", "start"]