FROM node:8-slim
# WORKDIR specifies the directory our
# application's code will live within
#WORKDIR /server
# We copy our package.json file to our
# app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
#COPY package.json /usr/src/app/
RUN npm install
COPY package.json /server
# We then run npm install to install
# express for our application
#RUN npm install
# We then copy the rest of our application
# to the app direcoty
COPY . /server
# We start our application by calling
# npm start.
CMD ["npm", "runs2"]