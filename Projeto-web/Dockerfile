# Usa a imagem do Node.js para construir o projeto
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./ 

RUN npm install

COPY . .

# Compila o projeto para produção
RUN npx vite build

# Usa uma imagem leve do Nginx para servir os arquivos
FROM nginx:alpine

# Copia os arquivos estáticos gerados pelo React para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]