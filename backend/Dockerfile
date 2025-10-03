# backend/Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY backend/ ./backend
EXPOSE 3000
CMD ["npm", "start"]
