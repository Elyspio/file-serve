# Get application dependencies
FROM  node:16 as deps

COPY front/package.json /app/package.json
COPY front/yarn.lock /app/yarn.lock
RUN cd /app && yarn install

WORKDIR /app

CMD ["yarn", "start"]
