FROM node:lts-alpine
WORKDIR /app
copy package.json /app
RUN npm install 
COPY . /app
RUN ls -l