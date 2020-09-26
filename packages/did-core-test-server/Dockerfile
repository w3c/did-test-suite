  
FROM node:12

WORKDIR /usr/src/app

COPY package.json package.json
COPY ./src ./src

RUN npm install

EXPOSE 8080

CMD [ "node", "./src/run.js" ]