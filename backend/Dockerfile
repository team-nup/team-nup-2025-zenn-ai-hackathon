FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src/ .
EXPOSE 8080
CMD ["node", "src/index.js"]
