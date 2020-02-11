FROM node:12.7.0
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:prod" ]
