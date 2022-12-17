FROM node

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install -g npm@8.7.0

RUN npm install

COPY . .