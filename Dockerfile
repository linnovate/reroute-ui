FROM node:7

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 9000
CMD [ "node" , "server" ]