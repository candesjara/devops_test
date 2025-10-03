# Etapa 1: construir frontend Angular 13
FROM node:18 AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build --prod

# Etapa 2: backend + frontend compilado
FROM node:18
WORKDIR /app

# Copiar backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install
COPY backend/ .

# Copiar frontend compilado al directorio público
COPY --from=build-frontend /app/frontend/dist/frontend ./public

EXPOSE 3000
CMD ["node", "index.js"]
