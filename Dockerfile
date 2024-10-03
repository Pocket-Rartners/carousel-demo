FROM node:22.9

WORKDIR /usr/app

COPY ./ ./

RUN npm install

CMD ["npm", "run", "dev"]
