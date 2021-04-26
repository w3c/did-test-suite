  
FROM node:14

WORKDIR /usr/src/app

COPY ./packages/did-core-test-server/run.js ./packages/did-core-test-server/run.js
COPY ./packages/did-core-test-server/app.js ./packages/did-core-test-server/app.js
COPY ./packages/did-core-test-server/__fixtures__ ./packages/did-core-test-server/__fixtures__
COPY ./packages/did-core-test-server/services ./packages/did-core-test-server/services
COPY ./packages/did-core-test-server/routes ./packages/did-core-test-server/routes
COPY ./packages/did-core-test-server/suites ./packages/did-core-test-server/suites
COPY ./packages/did-core-test-server/package.json ./packages/did-core-test-server/package.json

COPY ./packages/jest-did-matcher/src ./packages/jest-did-matcher/src
COPY ./packages/jest-did-matcher/package.json ./packages/jest-did-matcher/package.json

COPY ./package.json ./package.json
COPY ./lerna.json ./lerna.json

RUN npm install -g lerna
RUN lerna bootstrap
RUN lerna run build

EXPOSE 8080

CMD [ "node", "./packages/did-core-test-server/run.js" ]
