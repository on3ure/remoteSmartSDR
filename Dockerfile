FROM node:14

WORKDIR /app/web

RUN yarn

CMD [ "yarn", "dev" ]