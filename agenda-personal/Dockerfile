# Utiliza una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al directorio de trabajo
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecutará tu aplicación
EXPOSE 3000

# Define el comando para ejecutar tu aplicación
CMD ["npm", "start"]