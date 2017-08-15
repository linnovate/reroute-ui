#To run this docker: docker run -d -p 3000:3000 -it node-client node server.js


FROM node:7


# create app directory in container
#RUN mkdir -p /app

# set /app directory as default working directory
#WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
#ADD package.json  /app
ADD . /
# copy all file from current dir to /app in container
#COPY . /app

RUN npm install
RUN npm run build

# expose port 4040
EXPOSE 3000

# cmd to start service
CMD [ "start"]




