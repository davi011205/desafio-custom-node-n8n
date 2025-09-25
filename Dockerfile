# Etapa 1: build do conector personalizado
FROM node:22 AS build

WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Compila TypeScript
RUN npm run build

# Etapa 2: imagem final do n8n + custom node
FROM n8nio/n8n:latest

USER node
WORKDIR /home/node/.n8n

# Copia build do conector
COPY --from=build /usr/src/app/dist ./custom

# Copia package.json para instalar dependências do conector
COPY --from=build /usr/src/app/package.json ./

# Instala apenas dependências de produção
RUN npm install --production

# Local dos custom nodes
ENV N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom

EXPOSE 5678

ENTRYPOINT ["n8n"]
