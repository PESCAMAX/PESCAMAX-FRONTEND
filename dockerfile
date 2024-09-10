# Usa una imagen de Node.js con una versión compatible
from node:18 as build-step

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json
COPY package.json /app

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . /app

# Construye la aplicación Angular
RUN npm run build --prod

# Usa una imagen de Nginx como base para servir la aplicación
from nginx:1.17.1-alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build-step /app/dist/pescamax /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]