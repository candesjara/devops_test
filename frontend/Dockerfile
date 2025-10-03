# Stage 0: build
FROM node:18 AS build

WORKDIR /app

# Copiar solo los package.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el contenido de la carpeta frontend (ya estamos en ./frontend)
COPY . .

# Construir la app
RUN npm run build

# Stage 1: servir con Nginx
FROM nginx:alpine

# Copiar los archivos de build de Angular
COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
