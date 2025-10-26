# Use Node 20 to satisfy package engine requirement
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g json-server

COPY . .

EXPOSE 3001

CMD ["json-server", "--watch", "data.json", "--host", "0.0.0.0", "--port", "3001"]
