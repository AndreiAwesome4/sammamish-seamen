FROM node:10
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8004
CMD [ "npm", "run", "serve" ]
