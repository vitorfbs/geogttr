FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon ts-node
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["nodemon", "--watch", "src", "--exec", "ts-node", "src/main.ts"]
