# Usa una imagen base de Node.js con una versión reciente
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instala las dependencias de la aplicación
RUN npm install

# Compila la aplicación
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]
